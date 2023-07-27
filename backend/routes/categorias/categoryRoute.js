import express from 'express';
import Category from '../../models/categorias/categoryModel.js';

const categoryRouter = express.Router();

// get all category
categoryRouter.get('/all', async (req, res) => {
    const category = await Category.find();
    res.send(category);
});

//get category by id
categoryRouter.get('/find/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
        res.send(category);
    } else {
        res.status(404).send({ message: "¡.Categoría NO Encontrado.!" });
    }
});

//count category for admin panel
categoryRouter.get('/countCategories', async (req, res) => {

    try {
        const countCategories = await Category.countDocuments();
        res.status(200).json({ count: countCategories });

    } catch (err) {
        console.log(err.message);
    }

});

//delete category
categoryRouter.delete('/delete/:id', async (req, res) => {

    try {

        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json('¡.Categoría Ha Sido Eliminado.!');

    } catch (err) {
        console.log('¡.NO Se Puede Eliminar.!');
    }

});

// update category
categoryRouter.put('/update', async (req, res) => {

    const category = await Category.findById(req.body._id);

    //if category exists
    if (category) {
        category.titlecategory = req.body.titlecategory || category.titlecategory;

        const updatedCategory = await category.save();
        res.send({

            _id: updatedCategory._id,
            titlecategory: updatedCategory.titlecategory,

        });
    } else {

        res.status(401).send({ message: '¡.Categoría NO Encontrado.!' });

    }
});

// for add category -> from admin panel
categoryRouter.post('/add', async (req, res) => {
    const newCategory = new Category({
        titlecategory: req.body.titlecategory,
    });
    const category = await newCategory.save();
    res.send({
        _id: category._id,
        titlecategory: category.titlecategory,
    })
});

export default categoryRouter;