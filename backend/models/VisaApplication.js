// models/VisaApplication.js
import mongoose from 'mongoose';

const VisaApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  visaType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const VisaApplication = mongoose.model('VisaApplication', VisaApplicationSchema);
export default VisaApplication;
