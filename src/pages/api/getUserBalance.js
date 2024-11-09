import clientPromise from '../api/mongodb';

export default async function getUserBalance(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Retrieve the user's email from the session or request (you might want to get it from JWT token)
  const userEmail = req.query.email;

  if (!userEmail) {
    return res.status(400).json({ message: 'User email is required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('volt_bank');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ balance: user.balance });
  } catch (error) {
    console.error('Error fetching user balance:', error);
    return res.status(500).json({ message: 'Error fetching user balance' });
  }
}
