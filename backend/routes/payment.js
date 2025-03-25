import express from 'express';
import { body, validationResult } from 'express-validator';
import VisaApplication from '../models/VisaApplication.js';
import DrawApplication from '../models/DrawApplication.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import axios from 'axios';
import safepayConfig from '../config/safepay.js';

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
    body('paymentMethod').notEmpty().withMessage('Payment method is required'),
    body('paymentInfo').isObject().withMessage('Payment information is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { applicationId, paymentMethod, paymentInfo } = req.body;
      
      // Find the application
      const application = await DrawApplication.findById(applicationId);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      
      // Check if the application belongs to the requesting user
      if (application.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to pay for this application' });
      }
      
      // Store payment method and details
      application.paymentMethod = paymentMethod;
      application.paymentDetails = paymentInfo;
      application.paymentStatus = true;
      application.paymentDate = new Date();
      
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

// Create Safepay checkout session for draw application
router.post(
  '/safepay/create-session',
  verifyToken,
  [
    body('applicationId').notEmpty().withMessage('Application ID is required'),
    body('returnUrl').notEmpty().withMessage('Return URL is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { applicationId, returnUrl } = req.body;
      
      // Find the application
      const application = await DrawApplication.findById(applicationId);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      
      // Check if the application belongs to the requesting user
      if (application.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to pay for this application' });
      }
      
      // Create a checkout session with Safepay
      const response = await axios.post(
        `${safepayConfig.baseUrl}/order/v1/init`,
        {
          amount: 3000,
          currency: 'PKR',
          order_id: applicationId,
          customer_email: req.user.email,
          source: 'custom',
          cancel_url: `${returnUrl}?status=cancelled`,
          success_url: `${returnUrl}?status=success&order_id=${applicationId}`,
        },
        {
          headers: {
            'Authorization': `Bearer ${safepayConfig.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data && response.data.token) {
        res.json({
          checkoutUrl: `${safepayConfig.sandboxMode ? 'https://sandbox.api.getsafepay.com' : 'https://api.getsafepay.com'}/checkout/pay?token=${response.data.token}`,
          token: response.data.token
        });
      } else {
        throw new Error('Failed to create Safepay checkout session');
      }
    } catch (error) {
      console.error('Error creating Safepay checkout session:', error.response?.data || error.message);
      res.status(500).json({ 
        message: 'Failed to create payment session', 
        error: error.response?.data || error.message 
      });
    }
  }
);

// Verify Safepay payment
router.post(
  '/safepay/verify',
  verifyToken,
  [
    body('token').notEmpty().withMessage('Safepay token is required'),
    body('applicationId').notEmpty().withMessage('Application ID is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { token, applicationId } = req.body;
      
      // Find the application
      const application = await DrawApplication.findById(applicationId);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      
      // Verify payment with Safepay
      const response = await axios.get(
        `${safepayConfig.baseUrl}/order/v1/verify?token=${token}`,
        {
          headers: {
            'Authorization': `Bearer ${safepayConfig.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data && response.data.status === 'paid') {
        // Update application payment status
        application.paymentMethod = 'safepay';
        application.paymentDetails = {
          token: token,
          transactionId: response.data.reference,
          paymentTime: new Date()
        };
        application.paymentStatus = true;
        application.paymentDate = new Date();
        
        await application.save();
        
        // Determine if the user won the draw (20% chance)
        const isWinner = Math.random() < 0.2;
        
        res.json({
          message: 'Payment verified successfully',
          application,
          drawResult: isWinner ? 'Congratulations! You won the lucky draw.' : 'You did not win this time. Try again next draw.',
          isWinner
        });
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      console.error('Error verifying Safepay payment:', error.response?.data || error.message);
      res.status(500).json({ 
        message: 'Payment verification failed', 
        error: error.response?.data || error.message 
      });
    }
  }
);

// Safepay webhook handler
router.post('/safepay/webhook', async (req, res) => {
  try {
    const payload = req.body;
    
    // In production, you should verify the webhook signature
    // const signature = req.headers['x-sfpy-signature'];
    // Verify signature logic here...
    
    if (payload.event === 'payment.successful') {
      const applicationId = payload.data.order_id;
      
      // Find and update the application
      const application = await DrawApplication.findById(applicationId);
      if (application) {
        application.paymentMethod = 'safepay';
        application.paymentDetails = {
          token: payload.data.token,
          transactionId: payload.data.reference,
          paymentTime: new Date()
        };
        application.paymentStatus = true;
        application.paymentDate = new Date();
        
        await application.save();
      }
    }
    
    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('Error processing Safepay webhook:', error);
    res.status(500).send('Webhook processing failed');
  }
});

export default router;