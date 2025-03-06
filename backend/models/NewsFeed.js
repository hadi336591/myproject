import mongoose from 'mongoose';

const NewsFeedSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const NewsFeed = mongoose.model('NewsFeed', NewsFeedSchema);
export default NewsFeed;
