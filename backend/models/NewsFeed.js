import mongoose from 'mongoose';

const NewsFeedSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('NewsFeed', NewsFeedSchema);