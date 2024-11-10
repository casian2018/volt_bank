import clientPromise from "./mongodb";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

async function buyForex(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const email = decoded.email;

        const client = await clientPromise;
        const db = client.db("volt_bank");
        const user = await db.collection("users").findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { currency, amount, spendingPrice } = req.body;

        if (!currency || !amount || !spendingPrice) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (user.balance < spendingPrice) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        await db.collection("users").updateOne(
            { email },
            { 
                $inc: { [`forexBalances.${currency}`]: amount },
                $set: { balance: user.balance - spendingPrice }
            }
        );

        console.log(`Buying ${amount} of ${currency} for ${spendingPrice} USD`);

        return res.status(200).json({ message: "Forex bought successfully" });
    } catch (error) {
        console.error("Error buying forex:", error);
        return res.status(500).json({ message: "Error buying forex" });
    }
}

export default buyForex;
