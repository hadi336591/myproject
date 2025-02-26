// routes/notifications.js
import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  const { to, subject, text } = req.body;
  // Using ethereal.email for testing purposes.
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  try {
    let info = await transporter.sendMail({
      from: '"VisaApply" <no-reply@visaapply.com>',
      to,
      subject,
      text,
    });
    res.json({ message: 'Notification sent', info });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send notification' });
  }
});

export default router;
