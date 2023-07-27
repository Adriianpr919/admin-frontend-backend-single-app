//Create table for colorstone
import mongoose from 'mongoose';

const colorstoneSchema = new mongoose.Schema({
  titlecolorstone: { type: String, required: true },
}, {
  timestamps: true //for date
});

const Colorstone = mongoose.model('Colorstone', colorstoneSchema);
export default Colorstone;