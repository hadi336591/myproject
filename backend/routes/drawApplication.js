import express from 'express';
import { body, validationResult } from 'express-validator';
import { verifyToken } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/fileUpload.js';
import DrawApplication from '../models/DrawApplication.js';
import path from 'path';

const router = express.Router();

// Handle file uploads for draw application
const uploadFields = upload.fields([
  { name: 'passportPhoto', maxCount: 1 },
  { name: 'passportScan', maxCount: 1 }
]);

// Submit draw application
router.post('/', verifyToken, uploadFields, [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('fatherName').notEmpty().withMessage('Father name is required'),
  body('passportNo').notEmpty().withMessage('Passport number is required'),
  body('country').notEmpty().withMessage('Country is required'),
  body('visaType').notEmpty().withMessage('Visa type is required'),
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if files were uploaded
    if (!req.files || !req.files.passportPhoto || !req.files.passportScan) {
      return res.status(400).json({ message: 'Passport photo and scan are required' });
    }

    // Create new application
    const newApplication = new DrawApplication({
      fullName: req.body.fullName,
      fatherName: req.body.fatherName,
      passportNo: req.body.passportNo,
      country: req.body.country,
      visaType: req.body.visaType,
      passportPhoto: `/uploads/${req.files.passportPhoto[0].filename}`,
      passportScan: `/uploads/${req.files.passportScan[0].filename}`,
      userId: req.user.id
    });

    await newApplication.save();
    res.status(201).json({ 
      message: 'Application submitted successfully', 
      application: newApplication 
    });
  } catch (error) {
    console.error('Error submitting draw application:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's draw applications
router.get('/my-applications', verifyToken, async (req, res) => {
  try {
    const applications = await DrawApplication.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get specific application
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const application = await DrawApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if user owns this application or is admin
    if (application.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;