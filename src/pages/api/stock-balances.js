import clientPromise from './mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

async function getStockBalances(req, res) {
    if (req.method !== 'GET') {
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

        if (!user || !user.stockBalances) {
            return res.status(404).json({ message: 'User not found or no balances available' });
        }

        return res.status(200).json(user.stockBalances);
    } catch (error) {
        console.error('Error fetching user balances:', error);
        return res.status(500).json({ message: 'Error fetching user balances' });
    }
}

export default getStockBalances;
