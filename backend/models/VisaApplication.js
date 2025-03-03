import mongoose from 'mongoose';

const VisaApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  visaType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('VisaApplication', VisaApplicationSchema);
