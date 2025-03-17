import mongoose from 'mongoose';

const DrawApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  fatherName: { type: String, required: true },
  passportNo: { type: String, required: true },
  country: { type: String, required: true },
  visaType: { type: String, required: true },
  passportPhoto: { type: String, required: true }, // URL to stored image
  passportScan: { type: String, required: true }, // URL to stored image
  paymentStatus: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('DrawApplication', DrawApplicationSchema);