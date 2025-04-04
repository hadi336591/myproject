import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import VisaApplication from '../models/VisaApplication.js';
import DrawApplication from '../models/DrawApplication.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    // Get the latest visa application for the logged-in user
    const application = await VisaApplication.findOne({ userId: req.user.id }).sort({ createdAt: -1 });
    
    // Get all draw applications for the logged-in user
    const drawApplications = await DrawApplication.find({ userId: req.user.id }).sort({ drawEntryDate: -1 });
    
    res.json({ 
      message: 'Dashboard data fetched', 
      user: req.user, 
      application, 
      drawApplications
    });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ message: 'Failed to fetch dashboard data', error: err.message });
  }
});

export default router;