import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import VisaApplication from '../models/VisaApplication.js';
import DrawApplication from '../models/DrawApplication.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    // Get the latest visa application
    const visaApplication = await VisaApplication.findOne({ userId: req.user.id }).sort({ createdAt: -1 });
    
    // Get the latest draw application
    const drawApplication = await DrawApplication.findOne({ userId: req.user.id }).sort({ createdAt: -1 });
    
    // Get all draw applications for this user
    const allDrawApplications = await DrawApplication.find({ userId: req.user.id }).sort({ createdAt: -1 });
    
    res.json({ 
      message: 'Dashboard data fetched', 
      user: req.user, 
      visaApplication, 
      drawApplication,
      allDrawApplications
    });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ message: 'Failed to fetch dashboard data', error: err.message });
  }
});

export default router;