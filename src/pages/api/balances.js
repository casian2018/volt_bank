import { MongoClient } from 'mongodb';
import clientPromise from './mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

async function getCryptoBalances(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Get the token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token and extract email from it
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;

    // Connect to the MongoDB database
    const client = await clientPromise;
    const db = client.db('volt_bank');
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch crypto balances from the user object
    const cryptoBalances = user.cryptoBalances || {}; // Assuming 'cryptoBalances' is stored in the user document

    return res.status(200).json({ cryptoBalances });
  } catch (error) {
    console.error('Error fetching crypto balances:', error);
    return res.status(500).json({ message: 'Error fetching crypto balances' });
  }
}

export default getCryptoBalances;