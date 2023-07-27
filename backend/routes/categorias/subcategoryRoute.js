import express from 'express';
import Subcategory from '../../models/categorias/subcategoryModel.js';

const subcategoryRouter = express.Router();

// get all subcategory
subcategoryRouter.get('/all', async (req, res) => {
    const subcategory = await Subcategory.find();
    res.send(subcategory);
});

//get subcategory by id
subcategoryRouter.get('/find/:id', async (req, res) => {
    const subcategory = await Subcategory.findById(req.params.id);
    if (subcategory) {
        res.send(subcategory);
    } else {
        res.status(404).send({ message: "¡.SubCategoría NO Encontrado.!" });
    }
});

//count subcategory for admin panel
subcategoryRouter.get('/countSubcategories', async (req, res) => {

    try {
        const countSubcategories = await Subcategory.countDocuments();
        res.status(200).json({ count: countSubcategories });

    } catch (err) {
        console.log(err.message);
    }

});

//delete subcategory
subcategoryRouter.delete('/delete/:id', async (req, res) => {

    try {

        await Subcategory.findByIdAndDelete(req.params.id);
        res.status(200).json('¡.SubCategoría Ha Sido Eliminado.!');

    } catch (err) {
        console.log('¡.NO Se Puede Eliminar.!');
    }

});

// update subcategory
subcategoryRouter.put('/update', async (req, res) => {

    const subcategory = await Subcategory.findById(req.body._id);

    //if subcategory exists
    if (subcategory) {
        subcategory.titlesubcategory = req.body.titlesubcategory || subcategory.titlesubcategory;

        const updatedSubcategory = await subcategory.save();
        res.send({

            _id: updatedSubcategory._id,
            titlesubcategory: updatedSubcategory.titlesubcategory,

        });
    } else {

        res.status(401).send({ message: '¡.SubCategoría NO Encontrado.!' });

    }
});

// for add subcategory -> from admin panel
subcategoryRouter.post('/add', async (req, res) => {
    const newSubcategory = new Subcategory({
        titlesubcategory: req.body.titlesubcategory,
    });
    const subcategory = await newSubcategory.save();
    res.send({
        _id: subcategory._id,
        titlesubcategory: subcategory.titlesubcategory,
    })
});

export default subcategoryRouter;