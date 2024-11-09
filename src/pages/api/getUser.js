import { MongoClient } from 'mongodb';
import clientPromise from './mongodb';
import jwt from 'jsonwebtoken'; // You can use the 'jsonwebtoken' package to decode JWT tokens

async function getUser(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  let email;

  // Extract the JWT token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1]; // assuming the token is in the format "Bearer <token>"

  if (!token) {
    return res.status(400).json({ message: 'Token missing or invalid' });
  }

  try {
    // Decode the JWT token to extract user data (like email)
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret here
    email = decoded.email; // Assuming the JWT contains an 'email' field

    if (!email) {
      return res.status(400).json({ message: 'Email not found in token' });
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return res.status(500).json({ message: 'Error decoding token' });
  }

  try {
    // Fetch the user from the MongoDB database using the email extracted from the token
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
}

export default getUser;
