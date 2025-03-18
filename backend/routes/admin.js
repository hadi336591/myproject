import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { verifyAdmin } from '../middleware/authMiddleware.js';
import BlogPost from '../models/BlogPost.js';
import NewsFeed from '../models/NewsFeed.js';
import DrawApplication from '../models/DrawApplication.js';
import HeroContent from '../models/HeroContent.js';
import User from '../models/User.js';

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only .jpeg, .jpg, .png, and .pdf files are allowed'));
    }
  }
});

// GET - Admin dashboard data
router.get('/', verifyAdmin, async (req, res) => {
  try {
    // Get counts for dashboard
    const drawApplicationsCount = await DrawApplication.countDocuments();
    const paidDrawApplicationsCount = await DrawApplication.countDocuments({ paymentStatus: true });
    const usersCount = await User.countDocuments();
    const blogsCount = await BlogPost.countDocuments();
    
    // Get all draw applications
    const applications = await DrawApplication.find().sort({ drawEntryDate: -1 });
    
    // Get all blogs
    const blogs = await BlogPost.find().sort({ createdAt: -1 });
    
    // Get all news feeds
    const newsFeeds = await NewsFeed.find().sort({ createdAt: -1 });
    
    res.json({ 
      message: 'Admin dashboard data', 
      stats: {
        drawApplications: drawApplicationsCount,
        paidDrawApplications: paidDrawApplicationsCount,
        users: usersCount,
        blogs: blogsCount
      },
      applications,
      blogs,
      newsFeeds,
      user: req.user 
    });
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET - All draw applications
router.get('/draw-applications', verifyAdmin, async (req, res) => {
  try {
    const applications = await DrawApplication.find().sort({ drawEntryDate: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching draw applications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET - Hero content
router.get('/hero-content', verifyAdmin, async (req, res) => {
  try {
    const heroContent = await HeroContent.findOne({ isActive: true });
    res.json(heroContent || { title: 'Join Our Lucky Draw!', subtitle: 'Get a chance to win free visa processing by paying only 3000 PKR.', buttonText: 'Join Draw Now' });
  } catch (error) {
    console.error('Error fetching hero content:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST - Update hero content
router.post('/hero-content', verifyAdmin, async (req, res) => {
  try {
    const { title, subtitle, buttonText } = req.body;
    
    // Find existing active hero content
    let heroContent = await HeroContent.findOne({ isActive: true });
    
    if (heroContent) {
      // Update existing
      heroContent.title = title;
      heroContent.subtitle = subtitle;
      heroContent.buttonText = buttonText;
      heroContent.updatedAt = Date.now();
    } else {
      // Create new
      heroContent = new HeroContent({
        title,
        subtitle,
        buttonText
      });
    }
    
    await heroContent.save();
    res.json({ message: 'Hero content updated successfully', heroContent });
  } catch (error) {
    console.error('Error updating hero content:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST - Add a blog post
router.post('/add-blog', verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    
    const blog = new BlogPost({
      title,
      content,
      author: author || req.user.name,
      imageUrl: req.file ? req.file.path : null
    });
    
    await blog.save();
    res.status(201).json({ message: 'Blog post added successfully', blog });
  } catch (error) {
    console.error('Error adding blog post:', error);
    res.status(500).json({ message: 'Error adding blog post', error: error.message });
  }
});

// GET - All blog posts
router.get('/blogs', verifyAdmin, async (req, res) => {
  try {
    const blogs = await BlogPost.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST - Add a news feed
router.post('/add-feed', verifyAdmin, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  try {
    const feed = new NewsFeed({ title, content });
    await feed.save();
    res.status(201).json({ message: 'News feed added successfully', feed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding news feed', error: error.message });
  }
});

export default router;