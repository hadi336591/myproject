import express from 'express';
import multer from 'multer';
import { verifyAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/fileUpload.js';
import BlogPost from '../models/BlogPost.js';
import NewsFeed from '../models/NewsFeed.js';
import HeroSection from '../models/HeroSection.js';
import DrawApplication from '../models/DrawApplication.js';
import User from '../models/User.js';

const router = express.Router();

// GET admin dashboard stats
router.get('/stats', verifyAdmin, async (req, res) => {
  try {
    // Get counts for various entities
    const drawApplicationsCount = await DrawApplication.countDocuments();
    const paidDrawApplicationsCount = await DrawApplication.countDocuments({ paymentStatus: true });
    const usersCount = await User.countDocuments();
    const blogsCount = await BlogPost.countDocuments();
    
    res.json({
      drawApplications: {
        total: drawApplicationsCount,
        paid: paidDrawApplicationsCount
      },
      users: usersCount,
      blogs: blogsCount
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET all draw applications
router.get('/draw-applications', verifyAdmin, async (req, res) => {
  try {
    const applications = await DrawApplication.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching draw applications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Hero Section Management
// GET current hero section
router.get('/hero-section', verifyAdmin, async (req, res) => {
  try {
    const heroSection = await HeroSection.findOne({ isActive: true });
    res.json(heroSection || { message: 'No active hero section found' });
  } catch (error) {
    console.error('Error fetching hero section:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST update hero section
router.post('/hero-section', verifyAdmin, async (req, res) => {
  try {
    const { title, subtitle, buttonText } = req.body;
    
    if (!title || !subtitle || !buttonText) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Find existing or create new
    let heroSection = await HeroSection.findOne({ isActive: true });
    
    if (heroSection) {
      // Update existing
      heroSection.title = title;
      heroSection.subtitle = subtitle;
      heroSection.buttonText = buttonText;
      heroSection.updatedAt = Date.now();
    } else {
      // Create new
      heroSection = new HeroSection({
        title,
        subtitle,
        buttonText
      });
    }
    
    await heroSection.save();
    res.json({ message: 'Hero section updated successfully', heroSection });
  } catch (error) {
    console.error('Error updating hero section:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Blog Management
// GET all blogs
router.get('/blogs', verifyAdmin, async (req, res) => {
  try {
    const blogs = await BlogPost.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST create blog
router.post('/blogs', verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    
    const newBlog = new BlogPost({
      title,
      content,
      author: author || 'Admin',
      image: req.file ? `/uploads/${req.file.filename}` : null
    });
    
    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT update blog
router.put('/blogs/:id', verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, content, author, isPublished } = req.body;
    
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // Update fields
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    blog.isPublished = isPublished !== undefined ? isPublished : blog.isPublished;
    blog.updatedAt = Date.now();
    
    if (req.file) {
      blog.image = `/uploads/${req.file.filename}`;
    }
    
    await blog.save();
    res.json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE blog
router.delete('/blogs/:id', verifyAdmin, async (req, res) => {
  try {
    const blog = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;