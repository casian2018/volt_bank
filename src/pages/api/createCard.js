// pages/api/createCard.js
import clientPromise from '../api/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, cardInfo } = req.body;
    console.log("Received card creation request:", { userId, cardInfo });

    try {
      const client = await clientPromise;
      const db = client.db('volt_bank'); // Replace with your actual DB name
      const collection = db.collection('users');

      // Check if the user exists
      const user = await collection.findOne({ email: userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Add the new card to the user's account
      await collection.updateOne(
        { email: userId },
        { $push: { cardInfo: cardInfo } } // Assuming the user has a `cards` field to store the new cards
      );

      console.log("Card added to user's account:", cardInfo);
      res.status(200).json({ message: 'Card created successfully' });
    } catch (error) {
      console.error('Error creating card:', error);
      res.status(500).json({ error: 'Failed to create card' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
