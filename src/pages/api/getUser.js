import { MongoClient } from 'mongodb';
import clientPromise from './mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

async function getUser(req, res) {
  if (req.method === 'GET') {
    // Handle GET request
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

      if (user) {
        return res.status(200).json({ user });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ message: 'Error fetching user data' });
    }
  } else if (req.method === 'POST') {
    // Handle POST request for upload
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

      const { balance, savings } = req.body;

      // Update user data in the database
      await db.collection('users').updateOne(
        { email },
        { $set: { balance, savings } }
      );

      return res.status(200).json({ message: 'User data updated successfully' });
    } catch (error) {
      console.error('Error updating user data:', error);
      return res.status(500).json({ message: 'Error updating user data' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default getUser;
