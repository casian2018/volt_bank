// pages/api/getUserCryptoBalances.js
import clientPromise from './mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token found' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;

    const client = await clientPromise;
    const db = client.db('volt_bank');
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const cryptoBalances = user.cryptoBalances || {};
    return res.status(200).json({ cryptoBalances });
  } catch (error) {
    console.error('Error fetching crypto balances:', error);
    return res.status(500).json({ error: 'Error fetching crypto balances' });
  }
}
