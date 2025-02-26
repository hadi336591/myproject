// routes/visaApplication.js
import express from 'express';
import VisaApplication from '../models/VisaApplication.js';

const router = express.Router();

// POST /api/visa-application
router.post('/', async (req, res) => {
  try {
    const applicationData = req.body;
    const newApplication = new VisaApplication(applicationData);
    await newApplication.save();
    res.status(200).json({ message: 'Application received', data: newApplication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
