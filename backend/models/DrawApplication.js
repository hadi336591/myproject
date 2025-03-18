import mongoose from 'mongoose';

const DrawApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  fatherName: { type: String, required: true },
  passportNo: { type: String, required: true },
  country: { type: String, required: true },
  visaType: { type: String, required: true },
  passportPhoto: { type: String, required: true }, // URL to stored image
  passportScan: { type: String, required: true }, // URL to stored image
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  paymentStatus: { type: Boolean, default: false },
  paymentMethod: { type: String, enum: ['creditCard', 'bankTransfer', 'easypaisa', 'jazzCash'], default: null },
  paymentDetails: { type: Object, default: {} },
  paymentDate: { type: Date },
  isWinner: { type: Boolean, default: false },
  drawEntryDate: { type: Date, default: Date.now },
});

export default mongoose.model('DrawApplication', DrawApplicationSchema);