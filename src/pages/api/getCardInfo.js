// pages/api/getCardInfo.js
import clientPromise from './mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.query;

  // Debugging log to check if email is passed correctly
  console.log("Received email:", email);

  // Check if email query parameter is missing
  if (!email) {
    return res.status(400).json({ error: 'Email query parameter is missing' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('volt_bank');

    // Attempt to find the user by email in the database
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      // Log if user is not found
      console.log("User not found for email:", email);
      return res.status(404).json({ error: 'User not found' });
    }

    // Log user data if found
    console.log("User found:", user);

    // Send only the necessary card info to the client
    return res.status(200).json({
      cardInfo: user.cardInfo,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.error('Error fetching card info:', error);
    return res.status(500).json({ error: 'An error occurred while fetching card info' });
  }
}