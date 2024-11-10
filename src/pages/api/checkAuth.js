// /pages/api/checkAuth.js

export default async function handler(req, res) {
    try {
      const token = req.cookies.token; // or however you handle authentication (e.g., JWT)
      if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
      }
  
      // Optionally, verify token here (e.g., using a JWT library)
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      res.status(200).json({ message: "Authenticated" });
    } catch (error) {
      res.status(401).json({ message: "Not authenticated" });
    }
  }
  