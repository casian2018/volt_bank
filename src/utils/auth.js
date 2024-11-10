import jwt from 'jsonwebtoken';

export const isAuthenticated = (req) => {
  // Get the token from the cookies
  const token = req.cookies.token;

  // If no token exists, the user is not authenticated
  if (!token) {
    throw new Error('Not authenticated');
  }

  try {
    // Verify the token using your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // If valid, return the decoded token
  } catch (error) {
    throw new Error('Invalid token');
  }
};
