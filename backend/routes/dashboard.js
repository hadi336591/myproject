import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import VisaApplication from '../models/VisaApplication.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    // For demonstration, return the latest visa application
    const application = await VisaApplication.findOne().sort({ createdAt: -1 });
    // Additionally, assume we get draw info from the payment endpoint (dummy)
    // In a real app, you would fetch draw entries for the user.
    res.json({ message: 'Dashboard data fetched', user: req.user, application, draw: { drawUpdate: 'Draw status updated here.' } });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
});

export default router;
