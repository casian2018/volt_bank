import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.join(process.cwd(), 'email.txt');
    const email = fs.readFileSync(filePath, 'utf-8').trim();

    if (!email) {
      return res.status(400).json({ error: 'No email found in email.txt' });
    }

    res.status(200).json({ email });
  } catch (error) {
    console.error('Error reading email.txt:', error);
    res.status(500).json({ error: 'Error reading email.txt' });
  }
}