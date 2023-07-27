//Create table for banner
import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true, default: 'Admin' }
}, {
  timestamps: true //for date
});

const Banner = mongoose.model('Banner', bannerSchema);
export default Banner;