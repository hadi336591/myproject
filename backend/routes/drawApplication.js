import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { body, validationResult } from 'express-validator';
import DrawApplication from '../models/DrawApplication.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only .jpeg, .jpg, .png, and .pdf files are allowed'));
    }
  }
});

// POST - Submit draw application
router.post(
  '/',
  verifyToken,
  upload.fields([
    { name: 'passportPhoto', maxCount: 1 },
    { name: 'passportScan', maxCount: 1 }
  ]),
  [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('fatherName').notEmpty().withMessage('Father name is required'),
    body('passportNo').notEmpty().withMessage('Passport number is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('visaType').notEmpty().withMessage('Visa type is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.files || !req.files.passportPhoto || !req.files.passportScan) {
      return res.status(400).json({ message: 'Passport photo and scan are required' });
    }

    try {
      const { fullName, fatherName, passportNo, country, visaType } = req.body;
      
      const newApplication = new DrawApplication({
        fullName,
        fatherName,
        passportNo,
        country,
        visaType,
        passportPhoto: req.files.passportPhoto[0].path,
        passportScan: req.files.passportScan[0].path,
        userId: req.user.id,
        paymentStatus: false
      });

      await newApplication.save();
      res.status(201).json({ 
        message: 'Draw application submitted successfully', 
        applicationId: newApplication._id 
      });
    } catch (error) {
      console.error('Error submitting draw application:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// GET - Get user's draw applications
router.get('/my-applications', verifyToken, async (req, res) => {
  try {
    const applications = await DrawApplication.find({ userId: req.user.id }).sort({ drawEntryDate: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching draw applications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET - Get specific application by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const application = await DrawApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if the application belongs to the requesting user
    if (application.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this application' });
    }
    
    res.json(application);
  } catch (error) {
    console.error('Error fetching draw application:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;