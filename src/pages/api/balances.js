// pages/api/getUserCryptoBalances.js
import clientPromise from './mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token found' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const email = decoded.email;

        const client = await clientPromise;
        const db = client.db('volt_bank');
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (req.method === 'GET') {
            // Retrieve cryptoBalances
            if (user.cryptoBalances) {
                return res.status(200).json(user.cryptoBalances);
            } else {
                return res.status(404).json({ error: 'No balances available' });
            }
        } else if (req.method === 'POST') {
            const { symbol, balance } = req.body;

            if (!symbol || typeof balance !== 'number') {
                return res.status(400).json({ error: 'Invalid symbol or balance' });
            }

            // Update user's cryptoBalances
            const updatedCryptoBalances = {
                ...user.cryptoBalances,
                [symbol.toUpperCase()]: balance,
            };

            await usersCollection.updateOne(
                { email },
                { $set: { cryptoBalances: updatedCryptoBalances } }
            );

            return res.status(200).json({ message: 'Crypto added', cryptoBalances: updatedCryptoBalances });
        } else {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
