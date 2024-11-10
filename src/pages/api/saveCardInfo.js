import clientPromise from './mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, firstName, lastName, cardInfo } = req.body;

  // Validate input
  if (!email || !firstName || !lastName || !cardInfo) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('volt_bank');
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    
    if (existingUser) {
      // If the user exists, update their card info
      await db.collection('users').updateOne(
        { email },
        { $set: { firstName, lastName, cardInfo } }
      );
    } else {
      // If the user doesn't exist, create a new user
      await db.collection('users').insertOne({
        email,
        firstName,
        lastName,
        cardInfo,
      });
    }

    return res.status(200).json({ message: 'Card info saved successfully' });

  } catch (error) {
    console.error('Error saving card info:', error);
    return res.status(500).json({ error: 'An error occurred while saving card info' });
  }
}
