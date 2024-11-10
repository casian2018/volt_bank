import clientPromise from "./mongodb";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

async function sellForex(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
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

        const { pair, amount, sellingPrice } = req.body;

        if (!pair || !amount || !sellingPrice) {
            return res.status(400).json({ message: "Missing required fields: pair, amount, and sellingPrice are required" });
        }

        // Check if user has enough forex to sell
        if (!user.forexBalances[pair] || user.forexBalances[pair] < amount) {
            return res.status(400).json({ message: "Insufficient forex balance" });
        }

        // Calculate the total selling price in USD
        const totalSellingPrice = amount * sellingPrice;

        // Add totalSellingPrice to user's balance and deduct the amount of forex
        await db.collection("users").updateOne(
            { email },
            {
                $inc: { [`forexBalances.${pair}`]: -amount },
                $set: { balance: user.balance + totalSellingPrice },
            }
        );

        console.log(`Selling ${amount} of ${pair} for ${totalSellingPrice} USD`);

        return res.status(200).json({ message: "Forex sold successfully" });
    } catch (error) {
        console.error("Error selling forex:", error);
        return res.status(500).json({ message: "Error selling forex" });
    }
}

export default sellForex;