// routes/payment.js
import express from 'express';
const router = express.Router();

// POST /api/payment
router.post('/', (req, res) => {
  // Dummy payment processing logic
  res.json({ message: 'Payment processed successfully', details: req.body });
});

export default router;
