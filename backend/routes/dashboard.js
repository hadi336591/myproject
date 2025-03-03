import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import VisaApplication from '../models/VisaApplication.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    // For demonstration, we fetch the latest application.
    const application = await VisaApplication.findOne().sort({ createdAt: -1 });
    res.json({ message: 'User dashboard data', user: req.user, application });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch application data' });
  }
});

export default router;
