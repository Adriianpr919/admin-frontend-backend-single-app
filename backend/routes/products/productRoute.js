import express from 'express';
import Product from '../../models/products/productModel.js';

const productRouter = express.Router();

// get all products -> for frontend
productRouter.get('/all', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

//get product by id
productRouter.get('/find/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: "¡.Producto NO Encontrado.!" });
    }
});

//count products for admin panel
productRouter.get('/countProducts', async (req, res) => {

    try {
        const countProducts = await Product.countDocuments();
        res.status(200).json({ count: countProducts });

    } catch (err) {
        console.log(err.message);
    }

});

//delete product
productRouter.delete('/delete/:id', async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('¡.El Producto Ha Sido Eliminado.!');

    } catch (err) {
        console.log('¡.NO Se Puede Eliminar.!');
    }

});

// update product
productRouter.put('/update', async (req, res) => {

    const product = await Product.findById(req.body._id);

    //if product exists
    if (product) {
        product.title = req.body.title || product.title;
        product.categoryOptions = req.body.categoryOptions || product.categoryOptions;
        product.subcategoryOptions = req.body.subcategoryOptions || product.subcategoryOptions;
        product.tripletecategoryOptions = req.body.tripletecategoryOptions || product.tripletecategoryOptions;
        product.countInStock = req.body.countInStock || product.countInStock;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.sizesOptions = req.body.sizesOptions || product.sizesOptions;
        product.colorsgoldsOptions = req.body.colorsgoldsOptions || product.colorsgoldsOptions;
        product.colorsstonesOptions = req.body.colorsstonesOptions || product.colorsstonesOptions;
        product.image = req.body.image || product.image;
        product.imagesOnes = req.body.imagesOnes || product.imagesOnes;

        const updatedProduct = await product.save();
        res.send({

            _id: updatedProduct._id,
            title: updatedProduct.title,
            categoryOptions: updatedProduct.categoryOptions,
            subcategoryOptions: updatedProduct.subcategoryOptions,
            tripletecategoryOptions: updatedProduct.tripletecategoryOptions,
            countInStock: updatedProduct.countInStock,
            description: updatedProduct.description,
            price: updatedProduct.price,
            sizesOptions: updatedProduct.sizesOptions,
            colorsgoldsOptions: updatedProduct.colorsgoldsOptions,
            colorsstonesOptions: updatedProduct.colorsstonesOptions,
            image: updatedProduct.image,
            imagesOnes: updatedProduct.imagesOnes,

        });
    } else {

        res.status(401).send({ message: '¡.Producto NO Encontrado.!' });

    }
});

// for add product -> from admin panel
productRouter.post('/add', async (req, res) => {
    const newProduct = new Product({
        title: req.body.title,
        categoryOptions: req.body.categoryOptions,
        subcategoryOptions: req.body.subcategoryOptions,
        tripletecategoryOptions: req.body.tripletecategoryOptions,
        countInStock: req.body.countInStock,
        description: req.body.description,
        price: req.body.price,
        sizesOptions: req.body.sizesOptions,
        colorsgoldsOptions: req.body.colorsgoldsOptions,
        colorsstonesOptions: req.body.colorsstonesOptions,
        image: req.body.image,
        imagesOnes: req.body.imagesOnes,
    });
    const product = await newProduct.save();
    res.send({
        _id: product._id,
        title: product.title,
        categoryOptions: product.categoryOptions,
        subcategoryOptions: product.subcategoryOptions,
        tripletecategoryOptions: product.tripletecategoryOptions,
        countInStock: product.countInStock,
        description: product.description,
        price: product.price,
        sizesOptions: product.sizesOptions,
        colorsgoldsOptions: product.colorsgoldsOptions,
        colorsstonesOptions: product.colorsstonesOptions,
        image: product.image,
        imagesOnes: product.imagesOnes,
    })
});

export default productRouter;