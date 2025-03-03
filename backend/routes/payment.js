import express from 'express';
import { body, validationResult } from 'express-validator';
const router = express.Router();

// POST /api/payment
router.post(
  '/',
  [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('currency').notEmpty().withMessage('Currency is required')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    // Dummy payment processing logic
    res.json({ message: 'Payment processed successfully', details: req.body });
  }
);

export default router;
