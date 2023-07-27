//for seed al datas from data.js
import express from 'express';
///////////////////////////////////////////////////////////////////////////////////////////////
import data from '../../utils/data.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import Blog from '../../models/blogs/blogModel.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import Category from '../../models/categorias/categoryModel.js';
import Subcategory from '../../models/categorias/subcategoryModel.js';
import Tripletecategory from '../../models/categorias/tripletecategoryModel.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import Product from '../../models/products/productModel.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import Banner from '../../models/banners/bannerModel.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import About from '../../models/abouts/aboutModel.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import User from '../../models/users/userModel.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import Messageopcion from '../../models/messages/messageModel.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import Colorgold from '../../models/colors/colorGoldModel.js';
import Colorstone from '../../models/colors/colorStoneModel.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import Size from '../../models/sizes/sizeModel.js';
///////////////////////////////////////////////////////////////////////////////////////////////

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {

    //seed for users
    await User.remove({});
    const createdUser = await User.insertMany(data.users);

    //seed for messagesopcions
    await Messageopcion.remove({});
    const createdMessageopcion = await Messageopcion.insertMany(data.messagesopcions);

    //seed for abouts
    await About.remove({});
    const createdAbout = await About.insertMany(data.abouts);

    //seed for products
    await Product.remove({});
    const createdProduct = await Product.insertMany(data.products);

    //seed for sizes
    await Size.remove({});
    const createdSize = await Size.insertMany(data.sizes);

    //seed for colorsgolds
    await Colorgold.remove({});
    const createdColorgold = await Colorgold.insertMany(data.colorsgolds);

    //seed for colorsstones
    await Colorstone.remove({});
    const createdColorstone = await Colorstone.insertMany(data.colorsstones);

    //seed for blogs
    await Blog.remove({});
    const createdBlog = await Blog.insertMany(data.blogs);

    //seed for banners
    await Banner.remove({});
    const createdBanner = await Banner.insertMany(data.banners);

    //seed for Category
    await Category.remove({});
    const createdCategory = await Category.insertMany(data.category);

    //seed for Subcategory
    await Subcategory.remove({});
    const createdSubcategory = await Subcategory.insertMany(data.subcategory);

    //seed for Tripletecategory
    await Tripletecategory.remove({});
    const createdTripletecategory = await Tripletecategory.insertMany(data.tripletecategory);

    res.send({ createdUser, createdMessageopcion, createdAbout, createdBlog, createdBanner, createdProduct, createdSize, createdColorgold, createdColorstone, createdCategory, createdSubcategory, createdTripletecategory });
});

export default seedRouter;