import { MongoClient } from 'mongodb';
import clientPromise from './mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

async function sellCrypto(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const email = decoded.email;

        const client = await clientPromise;
        const db = client.db('volt_bank');
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { symbol, amount, spendingPrice } = req.body;

        if (!symbol || !amount || !spendingPrice) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if user has enough cryptocurrency to sell
        if (!user.cryptoBalances[symbol] || user.cryptoBalances[symbol] < amount) {
            return res.status(400).json({ message: 'Insufficient cryptocurrency balance' });
        }

        // Calculate the selling price in USD
        const sellingPrice = amount * spendingPrice;

        // Add sellingPrice to user's balance and deduct the amount of cryptocurrency
        await db.collection('users').updateOne(
            { email },
            { 
                $inc: { [`cryptoBalances.${symbol}`]: -amount },
                $set: { balance: user.balance + sellingPrice }
            }
        );

        console.log(`Selling ${amount} of ${symbol} for ${sellingPrice} USDT`);

        return res.status(200).json({ message: 'Cryptocurrency sold successfully' });
    } catch (error) {
        console.error('Error selling cryptocurrency:', error);
        return res.status(500).json({ message: 'Error selling cryptocurrency' });
    }
}

export default sellCrypto;
