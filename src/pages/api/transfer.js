// pages/api/transfer.js

import clientPromise from '../api/mongodb'; // MongoDB client
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

async function transfer(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Utility function to extract and verify JWT token
  const getToken = (req) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error('Unauthorized: No token found');
    return jwt.verify(token, JWT_SECRET);
  };

  let session;
  try {
    // Verify token and retrieve sender email
    const { email: senderEmail } = getToken(req);
    console.log('Token decoded successfully:', senderEmail);

    // Get transfer data
    const { receiverEmail, amount } = req.body;
    if (!receiverEmail || !amount || amount <= 0) {
      console.log('Invalid transfer data:', { receiverEmail, amount });
      return res.status(400).json({ message: 'Invalid transfer data' });
    }

    const client = await clientPromise;
    const db = client.db('volt_bank');

    // Find sender and receiver
    const sender = await db.collection('users').findOne({ email: senderEmail });
    const receiver = await db.collection('users').findOne({ email: receiverEmail });
    if (!sender || !receiver) {
      console.log('User not found:', sender ? 'Receiver' : 'Sender');
      return res.status(404).json({ message: 'User not found' });
    }

    if (sender.balance < amount) {
      console.log('Insufficient funds for sender:', senderEmail);
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    // Start session and transaction
    session = client.startSession();
    session.startTransaction();

    try {
      // Deduct from sender
      await db.collection('users').updateOne(
        { email: senderEmail },
        { $inc: { balance: -amount } },
        { session }
      );

      // Add to receiver
      await db.collection('users').updateOne(
        { email: receiverEmail },
        { $inc: { balance: amount } },
        { session }
      );

      // Commit transaction
      await session.commitTransaction();

      // Log transaction
      const transaction = {
        senderEmail,
        receiverEmail,
        amount,
        date: new Date(),
      };

      // Save transaction log for both users
      await db.collection('users').updateOne(
        { email: senderEmail },
        { $push: { transactions: transaction } }
      );
      await db.collection('users').updateOne(
        { email: receiverEmail },
        { $push: { transactions: transaction } }
      );

      console.log('Transaction successful:', transaction);
      return res.status(200).json({ message: 'Transfer successful' });
    } catch (error) {
      // Rollback transaction on failure
      await session.abortTransaction();
      console.error('Error during transaction:', error);
      return res.status(500).json({ message: '' });
    } finally {
      session.endSession();
    }
  } catch (error) {
    if (session) session.endSession();
    console.error('', error);
    return res.status(401).json({ message: 'Success' });
  }
}

export default transfer;