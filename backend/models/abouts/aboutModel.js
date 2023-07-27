//Create table for about
import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  imageOne: { type: String, required: true },
  titleOne: { type: String, required: true },
  descriptionOne: { type: String, required: true },
  titleTwo: { type: String, required: true },
  descriptionTwo: { type: String, required: true },
  titleThree: { type: String, required: true },
  descriptionThree: { type: String, required: true },
  imageFour: { type: String, required: true },
  titleFour: { type: String, required: true },
  descriptionFour: { type: String, required: true },
  titleFive: { type: String, required: true },
  imageMother: { type: String, required: true },
  imageDaughter: { type: String, required: true }
}, {
  timestamps: true //for date
});

const About = mongoose.model('About', aboutSchema);
export default About;