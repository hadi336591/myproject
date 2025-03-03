import express from 'express';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/admin (protected)
router.get('/', verifyAdmin, (req, res) => {
  res.json({ message: 'Admin panel data', user: req.user });
});

export default router;
