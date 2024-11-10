// pages/api/signOut.js
import { serialize } from 'cookie';

export default function handler(req, res) {
  // Clear the token cookie by setting an expired date
  res.setHeader('Set-Cookie', serialize('token', '', { path: '/', expires: new Date(0) }));
  
  // Respond with a success message
  res.status(200).json({ message: 'Signed out successfully' });
}
