import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import authRoutes from './routes/auth.js';
import visaApplicationRoutes from './routes/visaApplication.js';
import paymentRoutes from './routes/payment.js';
import dashboardRoutes from './routes/dashboard.js';
import adminRoutes from './routes/admin.js';
import drawApplicationRoutes from './routes/drawApplication.js';

// Import User model for admin seeding
import User from './models/User.js';

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Seed admin user if not exists
const seedAdminUser = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'hadibinkhalid@hotmail.com' });
    
    if (!adminExists) {
      // Create new admin user
      const admin = new User({
        name: 'Admin',
        email: 'hadibinkhalid@hotmail.com',
        password: '12345678',
        role: 'admin'
      });
      
      await admin.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};

// Call the seed function
seedAdminUser();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/visa-application', visaApplicationRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/draw-application', drawApplicationRoutes);

app.get('/', (req, res) => {
  res.send('Visa Application API is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});