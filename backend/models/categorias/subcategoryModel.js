//Create table for Subcategory
import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
    titlesubcategory: { type: String, required: true },
}, {
    timestamps: true //for date
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);
export default Subcategory;