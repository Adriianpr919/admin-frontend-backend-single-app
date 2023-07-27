//Create table for messageopcion
import mongoose from 'mongoose';

const messageopcionSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  comment: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false }
}, {
  timestamps: true //for date
});

const Messageopcion = mongoose.model('Messageopcion', messageopcionSchema);
export default Messageopcion;