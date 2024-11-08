import { MongoClient } from 'mongodb';
import clientPromise from './mongodb';

async function getTransactionsByType(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('volt_bank');
    
    // Group transactions by type, calculate the total for each category, and sort by total
    const aggregationPipeline = [
      { $unwind: '$transactions.cash' },
      {
        $group: {
          _id: '$transactions.cash.type',
          total: { $sum: { $toDouble: '$transactions.cash.price' } },
          lastTransaction: { $max: '$transactions.cash.date' },
        }
      },
      {
        $project: {
          type: '$_id',
          total: 1,
          lastTransaction: 1,
          _id: 0,
        }
      },
      // Sort categories by 'total' in descending order
      { $sort: { total: -1 } }
    ];
    
    const result = await db.collection('users').aggregate(aggregationPipeline).toArray();

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: 'No transactions found' });
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return res.status(500).json({ message: 'Error fetching transactions' });
  }
}

export default getTransactionsByType;
