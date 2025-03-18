import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for admin seeding');
    
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
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();