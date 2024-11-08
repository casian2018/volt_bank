import { MongoClient } from 'mongodb';
import clientPromise from './mongodb';
import fs from 'fs';
import path from 'path';

async function getBalances(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    let email;

    try {
        const filePath = path.join(process.cwd(), 'email.txt');
        email = fs.readFileSync(filePath, 'utf-8').trim();
        
        if (!email) {
            return res.status(400).json({ message: 'No email found in email.txt' });
        }
    } catch (error) {
        console.error('Error reading email.txt:', error);
        return res.status(500).json({ message: 'Error reading email.txt' });
    }

    try {
        const client = await clientPromise;
        const db = client.db('volt_bank');
        const user = await db.collection('users').findOne({ email });

        if (user && user.cryptoBalances) {
            return res.status(200).json(user.cryptoBalances);
        } else {
            return res.status(404).json({ message: 'User  not found or no balances available' });
        }
    } catch (error) {
        console.error('Error fetching user balances:', error);
        return res.status(500).json({ message: 'Error fetching user balances' });
    }
}

export default getBalances;