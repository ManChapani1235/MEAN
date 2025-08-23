import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'; // Import your user model

// Middleware for authenticating users
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Check if the token is provided and starts with 'Bearer'
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.userId = decoded.id; // Attach userId to request object

    // Optional: Fetch user details if needed
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Attach user details to request object if needed

    next(); // Proceed to the next middleware or route
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware for authenticating admin users
export const adminAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the token is provided
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from "Bearer token"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    // Check if the user's role is 'admin'
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    req.user = decoded; // Attach user info to request object
    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
