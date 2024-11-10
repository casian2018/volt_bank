// pages/api/createCard.js
import clientPromise from '../api/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, cardInfo } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db('volt_bank');
      const collection = db.collection('users');

      // Update user document by adding new card info
      await collection.updateOne(
        { email: userId },
        { $push: { cards: cardInfo } }
      );

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
