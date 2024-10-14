import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  console.log('Headers:', req.headers);
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Extracted token:', token);

  if (!token) {
    console.log('No token found in request');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    const user = await User.findById(decoded.userId).select('-password');
    console.log('Found user:', user);

    if (!user) {
      console.log('User not found for id:', decoded.userId);
      return res.status(401).json({ message: 'Token is not valid - User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ message: 'Token is not valid - ' + err.message });
  }
};
// Admin middleware
export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
