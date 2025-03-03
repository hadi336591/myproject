import express from 'express';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post(
  '/',
  [
    body('to').isEmail().withMessage('Valid email required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('text').notEmpty().withMessage('Text is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { to, subject, text } = req.body;
    try {
      // Using ethereal.email for testing; replace with a real service for production
      let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      let info = await transporter.sendMail({
        from: '"VisaApply" <no-reply@visaapply.com>',
        to,
        subject,
        text
      });
      res.json({ message: 'Notification sent', info });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to send notification', error });
    }
  }
);

export default router;
