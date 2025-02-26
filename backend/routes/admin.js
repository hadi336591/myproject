// routes/admin.js
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify admin access
const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Access denied, admin only' });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// GET /api/admin (protected)
router.get('/', adminMiddleware, (req, res) => {
  // Return admin panel data here, such as pending visa applications
  res.json({ message: 'Admin panel data', user: req.user });
});

export default router;
