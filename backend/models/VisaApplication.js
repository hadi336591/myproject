import mongoose from 'mongoose';

const VisaApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  visaType: { type: String, required: true },
  paymentStatus: { type: Boolean, default: false },
  drawEntry: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('VisaApplication', VisaApplicationSchema);
