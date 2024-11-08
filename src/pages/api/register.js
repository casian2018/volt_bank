import clientPromise from '../../pages/api/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { email, password, age, adress, firstName, lastName } = req.body;

  const client = await clientPromise;
  const db = client.db('volt_bank');
  const users = db.collection('users');

  // Check if user already exists
  const userExists = await users.findOne({ email });
  if (userExists) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into database
  await users.insertOne({
    email,
    password: hashedPassword,
    balance: 0, 
    savings: 0, 
    age,
    address, 
    firstName, 
    lastName
  });

  res.status(201).json({ message: 'User registered successfully' });
}
