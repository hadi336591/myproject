import express from 'express';
import { verifyAdmin } from '../middleware/authMiddleware.js';
import VisaApplication from '../models/VisaApplication.js';

const router = express.Router();

router.get('/', verifyAdmin, async (req, res) => {
  try {
    const applications = await VisaApplication.find().sort({ createdAt: -1 });
    res.json({ message: 'Admin panel data', applications });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admin data' });
  }
});

export default router;
