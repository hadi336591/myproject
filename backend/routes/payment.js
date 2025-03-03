import express from 'express';
import { body, validationResult } from 'express-validator';
import VisaApplication from '../models/VisaApplication.js';

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

export default router;
