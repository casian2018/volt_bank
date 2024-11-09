import clientPromise from './mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

async function stockBalances(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const email = decoded.email;

        const client = await clientPromise;
        const db = client.db('volt_bank');
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.method === 'GET') {
            // Retrieve stockBalances
            if (user.stockBalances) {
                return res.status(200).json(user.stockBalances);
            } else {
                return res.status(404).json({ message: 'No balances available' });
            }
        } else if (req.method === 'POST') {
            // Add a new stock with an initial balance
            const { symbol, balance } = req.body;

            if (!symbol || typeof balance !== 'number') {
                return res.status(400).json({ message: 'Invalid symbol or balance' });
            }

            // Update user's stockBalances
            const updatedStockBalances = {
                ...user.stockBalances,
                [symbol.toUpperCase()]: balance,
            };

            await usersCollection.updateOne(
                { email },
                { $set: { stockBalances: updatedStockBalances } }
            );

            return res.status(200).json({ message: 'Stock added', stockBalances: updatedStockBalances });
        } else {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default stockBalances;
