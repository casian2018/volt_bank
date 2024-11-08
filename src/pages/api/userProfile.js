import fs from 'fs';
import path from 'path';
import { connectToDatabase } from './mongodb'; // Your MongoDB connection utility

// Utility function to read the email from email.txt
const getEmailFromFile = () => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(process.cwd(), 'email.txt');
    
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.trim()); // Trim to remove any extra whitespace or newlines
      }
    });
  });
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const email = await getEmailFromFile(); // Read the email from email.txt

      const { db } = await connectToDatabase();
      const user = await db.collection('users').findOne({ email }); // Fetch the user by email from the file

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
