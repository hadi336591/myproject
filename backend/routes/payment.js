import express from 'express';
import { body, validationResult } from 'express-validator';
import VisaApplication from '../models/VisaApplication.js';
import DrawApplication from '../models/DrawApplication.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// This endpoint is used only for the lucky draw payment.
router.post(
  '/',
  [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('currency').notEmpty().withMessage('Currency is required'),
    body('draw').equals('true').withMessage('Draw flag must be true'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    // For demonstration, simulate payment processing and update draw entry status.
    try {
      // Optionally, simulate randomness to select a winner.
      const isWinner = Math.random() < 0.2; // 20% chance of winning, for example.
      // In a real system, you'd record the draw entry in a separate collection.
      // Here we update the VisaApplication's drawEntry flag if exists.
      // (Assuming the user is registered and the payment info is linked to them.)
      // For simplicity, we just return the result.
      res.json({
        message: 'Payment processed successfully',
        drawUpdate: isWinner ? 'Congratulations! You won the lucky draw.' : 'You did not win this time. Try again next draw.',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Payment failed', error });
    }
  }
);

// Process payment for draw application
router.post(
  '/draw-application',
  verifyToken,
  [
    body('applicationId').notEmpty().withMessage('Application ID is required'),
    body('paymentInfo').isObject().withMessage('Payment information is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { applicationId, paymentInfo } = req.body;
      
      // Find the application
      const application = await DrawApplication.findById(applicationId);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      
      // Check if the application belongs to the requesting user
      if (application.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to pay for this application' });
      }
      
      // Process payment (in a real app, you would integrate with a payment gateway)
      // For demo purposes, we'll just mark it as paid
      application.paymentStatus = true;
      await application.save();
      
      // Determine if the user won the draw (20% chance)
      const isWinner = Math.random() < 0.2;
      
      res.json({
        message: 'Payment processed successfully',
        application,
        drawResult: isWinner ? 'Congratulations! You won the lucky draw.' : 'You did not win this time. Try again next draw.',
        isWinner
      });
    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).json({ message: 'Payment failed', error: error.message });
    }
  }
);

export default router;