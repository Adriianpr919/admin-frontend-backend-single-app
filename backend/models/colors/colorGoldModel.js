//Create table for colorgold
import mongoose from 'mongoose';

const colorgoldSchema = new mongoose.Schema({
  titlecolorgold: { type: String, required: true },
}, {
  timestamps: true //for date
});

const Colorgold = mongoose.model('Colorgold', colorgoldSchema);
export default Colorgold;