import clientPromise from './mongodb';

export default async function transfer(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { senderEmail, receiverEmail, amount } = req.body;

  if (!senderEmail || !receiverEmail || !amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    const client = await clientPromise;
    const session = client.startSession();
    const db = client.db('volt_bank');
    
    await session.withTransaction(async () => {
      const usersCollection = db.collection('users');

      // Get sender and receiver accounts
      const sender = await usersCollection.findOne({ email: senderEmail }, { session });
      const receiver = await usersCollection.findOne({ email: receiverEmail }, { session });

      if (!sender) {
        throw new Error('Sender not found');
      }
      if (!receiver) {
        throw new Error('Receiver not found');
      }
      if (sender.balance < amount) {
        throw new Error('Insufficient funds');
      }

      // Update balances
      await usersCollection.updateOne(
        { email: senderEmail },
        { $inc: { balance: -amount } },
        { session }
      );

      await usersCollection.updateOne(
        { email: receiverEmail },
        { $inc: { balance: amount } },
        { session }
      );

      // Optional: log the transaction
      const transactionsCollection = db.collection('transactions');
      await transactionsCollection.insertOne(
        {
          senderEmail,
          receiverEmail,
          amount,
          date: new Date(),
        },
        { session }
      );
    });

    await session.endSession();
    return res.status(200).json({ message: 'Transfer successful' });

  } catch (error) {
    console.error('Transfer error:', error);
    return res.status(500).json({ message: 'Transfer failed', error: error.message });
  }
}
