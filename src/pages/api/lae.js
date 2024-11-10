import { MongoClient } from 'mongodb';
import clientPromise from '@/pages/api/mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const client = await clientPromise;
            const db = client.db('volt_bank');
            const earnData = await db.collection('earn').findOne({}, { projection: { _id: 0 } });

            return res.status(200).json(earnData);
        } catch (error) {
            console.error('Error fetching earn data:', error);
            return res.status(500).json({ message: 'Error fetching earn data' });
        }
    } else if (req.method === 'POST') {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const email = decoded.email;

            const client = await clientPromise;
            const db = client.db('volt_bank');
            const user = await db.collection('users').findOne({ email }, { projection: { _id: 0, hasResponded: 1 } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (user.hasResponded) {
                return res.status(400).json({ message: 'User has already responded' });
            }

            // Add 5 to the user's balance and set hasResponded to true
            await db.collection('users').updateOne(
                { email },
                { $inc: { balance: 5 }, $set: { hasResponded: true } }
            );

            return res.status(200).json({ message: 'Balance updated successfully' });
        } catch (error) {
            console.error('Error updating balance:', error);
            return res.status(500).json({ message: 'Error updating balance' });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}

export default handler;
