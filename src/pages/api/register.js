import clientPromise from '../../pages/api/mongodb';
import bcrypt from 'bcryptjs';



export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  // Log the request body to ensure all fields are received
  console.log('Received data:', req.body);

  const { email, password, age, address, firstName, lastName, cardNumber, cvvNumber, pinNumber, phone, city, country } = req.body;

  if (!email || !password ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

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

  // Insert user into database, including card information
  await users.insertOne({
    email,
    password: hashedPassword,
    balance: 0, 
    savings: 0, 
    age,
    address, 
    firstName, 
    lastName,
    phone,
    city,
    country,
    cardInfo: {
      cardNumber,    // Add card number to the database
      cvvNumber,     // Add CVV to the database
      pinNumber,     // Add pin to the database
    },
  });

  res.status(201).json({ message: 'User registered successfully' });
}
