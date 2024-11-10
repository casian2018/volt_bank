// pages/api/deleteCard.js
import clientPromise from '../api/mongodb';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { userId, cardId } = req.body;  // Assuming cardId is sent to identify the card

    console.log("Received card deletion request:", { userId, cardId });

    try {
      const client = await clientPromise;
      const db = client.db('volt_bank');  // Replace with your actual DB name
      const collection = db.collection('users');

      // Check if the user exists
      const user = await collection.findOne({ email: userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Remove the card from the user's account using the cardId
      const result = await collection.updateOne(
        { email: userId },
        { $pull: { cardInfo: { number: cardId } } }  // Removing the card with the given card number
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: 'Card not found' });
      }

      console.log("Card deleted from user's account:", cardId);
      res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
      console.error('Error deleting card:', error);
      res.status(500).json({ error: 'Failed to delete card' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
