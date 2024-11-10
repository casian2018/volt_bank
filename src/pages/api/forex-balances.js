import clientPromise from './mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function forexBalances(req, res) {
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
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.method === 'GET') {
      // Retrieve forexBalances
      if (user.forexBalances) {
        return res.status(200).json(user.forexBalances);
      } else {
        return res.status(404).json({ message: 'No balances available' });
      }
    } else if (req.method === 'POST') {
      // Add a new currency pair with an initial balance
      const { symbol, balance } = req.body;

      if (!symbol || typeof balance !== 'number') {
        return res.status(400).json({ message: 'Invalid symbol or balance' });
      }

      // Update user's forexBalances
      const updatedForexBalances = {
        ...user.forexBalances,
        [symbol.toUpperCase()]: balance,
      };

      await usersCollection.updateOne(
        { email },
        { $set: { forexBalances: updatedForexBalances } }
      );

      return res.status(200).json({ message: 'Currency pair added', forexBalances: updatedForexBalances });
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


