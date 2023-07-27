//Create table for category
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    titlecategory: { type: String, required: true },
}, {
    timestamps: true //for date
});

const Category = mongoose.model('Category', categorySchema);
export default Category;