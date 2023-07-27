//Create table for product
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    categoryOptions: { type: String, required: true },
    subcategoryOptions: { type: String, required: true },
    tripletecategoryOptions: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sizesOptions: [{ type: Object, required: true }],
    colorsgoldsOptions: [{ type: Object, required: true }],
    colorsstonesOptions: [{ type: Object, required: true }],
    image: { type: String, required: true },
    imagesOnes: { type: Object, required: true },
}, {
    timestamps: true //for date
});

const Product = mongoose.model('Product', productSchema);
export default Product;