//Create table for Tripletecategory
import mongoose from 'mongoose';

const tripletecategorySchema = new mongoose.Schema({
  titletripletecategory: { type: String, required: true },
}, {
  timestamps: true //for date
});

const Tripletecategory = mongoose.model('Tripletecategory', tripletecategorySchema);
export default Tripletecategory;