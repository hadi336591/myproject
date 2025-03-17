import express from 'express';
import { body, validationResult } from 'express-validator';
import { verifyToken } from '../middleware/authMiddleware.js';
import VisaApplication from '../models/VisaApplication.js';
import DrawApplication from '../models/DrawApplication.js';

const router = express.Router();

// Process payment for visa application or draw entry
router.post(
  '/',
  verifyToken,
  [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('currency').notEmpty().withMessage('Currency is required'),
    body('paymentType').isIn(['visa', 'draw']).withMessage('Payment type must be visa or draw'),
    body('applicationId').notEmpty().withMessage('Application ID is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    try {
      const { paymentType, applicationId } = req.body;
      
      // Process payment based on type
      if (paymentType === 'visa') {
        // Handle visa application payment
        const application = await VisaApplication.findById(applicationId);
        if (!application) {
          return res.status(404).json({ message: 'Visa application not found' });
        }
        
        // Update payment status
        application.paymentStatus = true;
        await application.save();
        
        res.json({
          message: 'Visa application payment processed successfully',
          application
        });
      } else if (paymentType === 'draw') {
        // Handle draw entry payment
        const application = await DrawApplication.findById(applicationId);
        if (!application) {
          return res.status(404).json({ message: 'Draw application not found' });
        }
        
        // Update payment status
        application.paymentStatus = true;
        await application.save();
        
        // Simulate lucky draw result
        const isWinner = Math.random() < 0.2; // 20% chance of winning
        
        res.json({
          message: 'Draw entry payment processed successfully',
          application,
          drawResult: {
            isWinner,
            message: isWinner 
              ? 'Congratulations! You won the lucky draw.' 
              : 'You did not win this time. Try again next draw.'
          }
        });
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      res.status(500).json({ message: 'Payment failed', error: error.message });
    }
  }
);

// Get payment status for an application
router.get('/status/:type/:id', verifyToken, async (req, res) => {
  try {
    const { type, id } = req.params;
    
    if (type === 'visa') {
      const application = await VisaApplication.findById(id);
      if (!application) {
        return res.status(404).json({ message: 'Visa application not found' });
      }
      res.json({ paymentStatus: application.paymentStatus });
    } else if (type === 'draw') {
      const application = await DrawApplication.findById(id);
      if (!application) {
        return res.status(404).json({ message: 'Draw application not found' });
      }
      res.json({ paymentStatus: application.paymentStatus });
    } else {
      res.status(400).json({ message: 'Invalid application type' });
    }
  } catch (error) {
    console.error('Error fetching payment status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;