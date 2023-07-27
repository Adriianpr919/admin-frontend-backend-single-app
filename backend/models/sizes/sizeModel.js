//Create table for size
import mongoose from 'mongoose';

const sizeSchema = new mongoose.Schema({
  titlesize: { type: String, required: true },
}, {
  timestamps: true //for date
});

const Size = mongoose.model('Size', sizeSchema);
export default Size;