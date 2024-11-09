import clientPromise from './mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

async function getForexBalances(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Get the token from cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        const email = decoded.email;

        const client = await clientPromise;
        const db = client.db('volt_bank');
        const user = await db.collection('users').findOne({ email });

        if (user && user.forexBalances) {
            return res.status(200).json(user.forexBalances);
        } else {
            return res.status(404).json({ message: 'User not found or no balances available' });
        }
    } catch (error) {
        console.error('Error verifying token or fetching balances:', error);
        return res.status(500).json({ message: 'Error verifying token or fetching balances' });
    }
}

export default getForexBalances;
