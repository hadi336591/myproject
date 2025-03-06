import express from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import { verifyAdmin } from '../middleware/authMiddleware.js';
import BlogPost from '../models/BlogPost.js';
import NewsFeed from '../models/NewsFeed.js';

const router = express.Router();

// GET /api/admin - Dummy admin panel endpoint (protected)
router.get('/', verifyAdmin, (req, res) => {
  res.json({ message: 'Admin panel data', user: req.user });
});

// Configure Multer for file uploads (for document verification)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists; you may need to create it manually.
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// POST /api/admin/verify-document - Document verification endpoint
router.post('/verify-document', verifyAdmin, upload.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No document uploaded' });
  }
  // Here you would implement actual document verification logic.
  res.json({ message: 'Document verified successfully', file: req.file.filename });
});

// POST /api/admin/add-blog - Add a blog post endpoint
router.post('/add-blog', verifyAdmin, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  try {
    const blog = new BlogPost({ title, content });
    await blog.save();
    res.status(200).json({ message: 'Blog post added successfully', blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding blog post' });
  }
});

// POST /api/admin/add-feed - Add a news feed endpoint
router.post('/add-feed', verifyAdmin, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  try {
    const feed = new NewsFeed({ title, content });
    await feed.save();
    res.status(200).json({ message: 'News feed added successfully', feed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding news feed' });
  }
});

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: 'No token, authorization denied' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== 'admin')
      return res.status(403).json({ message: 'Access denied, admin only' });
    next();
  });
};

export default router;
