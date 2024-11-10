import clientPromise from '@/pages/api/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password, age, address, firstName, lastName, phone, city, country } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('volt_bank');
    const users = db.collection('users');

    const userExists = await users.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cardInfo = [
      {
        number: '4' + Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join(''),
        cvv: Array.from({ length: 3 }, () => Math.floor(Math.random() * 10)).join(''),
        pin: Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join(''),
      }
    ];

    const iban = Array.from({ length: 22 }, () => Math.floor(Math.random() * 10)).join('');

    await users.insertOne({
      email,
      password: hashedPassword,
      balance: 1414,
      savings: 15,
      age,
      address,
      firstName,
      lastName,
      phone,
      city,
      country,
      cardInfo,
      iban,
      transactions: { cash: [], crypto: [] },
      cryptoBalances: { BTC: 2, ETH: 0.6, LTC: 0.4, XRP: 0.2 },
      stocks: { AAPL: 2, AMZN: 1, TSLA: 1 },
      forexBalances: { EUR: 100, GBP: 50, JPY: 5000 },
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}
