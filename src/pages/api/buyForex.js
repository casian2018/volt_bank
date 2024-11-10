import { MongoClient } from 'mongodb';
import clientPromise from './mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

async function buyCurrency(req, res) {
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

    // Check if user has enough balance in USD
    if (user.balance < spendingPrice) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Convert the spendingPrice to the correct currency if needed, 
    // assuming spendingPrice is in USD and you want to buy the forex pair in that amount
    // You may use an API to get real-time exchange rates here (e.g., USD to EUR).

    // Deduct spendingPrice (in USD) from the user's balance
    await db.collection('users').updateOne(
      { email },
      { 
        $inc: { [`forexBalances.${symbol}`]: amount },  // Increase forex balance for the selected pair
        $set: { balance: user.balance - spendingPrice }  // Deduct from USD balance
      }
    );

    console.log(`Buying ${amount} of ${symbol} for ${spendingPrice} USD`);

    return res.status(200).json({ message: 'Forex bought successfully' });

  } catch (error) {
    console.error('Error buying forex:', error);
    return res.status(500).json({ message: 'Error buying forex' });
  }
}

export default buyCurrency;
