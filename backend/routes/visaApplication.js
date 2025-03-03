import express from 'express';
import { body, validationResult } from 'express-validator';
import VisaApplication from '../models/VisaApplication.js';

const router = express.Router();

// POST /api/visa-application
router.post(
  '/',
  [
    body('fullName').notEmpty().withMessage('Full name required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('visaType').notEmpty().withMessage('Visa type required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const newApplication = new VisaApplication(req.body);
      await newApplication.save();
      res.status(200).json({ message: 'Application received', data: newApplication });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  }
);

export default router;
