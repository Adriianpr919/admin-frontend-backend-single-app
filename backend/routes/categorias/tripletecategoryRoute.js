import express from 'express';
import Tripletecategory from '../../models/categorias/tripletecategoryModel.js';

const tripletecategoryRouter = express.Router();

// get all Tripletecategory
tripletecategoryRouter.get('/all', async (req, res) => {
  const tripletecategory = await Tripletecategory.find();
  res.send(tripletecategory);
});

//get Tripletecategory by id
tripletecategoryRouter.get('/find/:id', async (req, res) => {
  const tripletecategory = await Tripletecategory.findById(req.params.id);
  if (tripletecategory) {
    res.send(tripletecategory);
  } else {
    res.status(404).send({ message: "¡.Multiples Categorías NO Encontrado.!" });
  }
});

//count Tripletecategory for admin panel
tripletecategoryRouter.get('/countTripletecategories', async (req, res) => {

  try {
    const countTripletecategories = await Tripletecategory.countDocuments();
    res.status(200).json({ count: countTripletecategories });

  } catch (err) {
    console.log(err.message);
  }

});

//delete Tripletecategory
tripletecategoryRouter.delete('/delete/:id', async (req, res) => {

  try {

    await Tripletecategory.findByIdAndDelete(req.params.id);
    res.status(200).json('¡.Multiples Categorías Ha Sido Eliminado.!');

  } catch (err) {
    console.log('¡.NO Se Puede Eliminar.!');
  }

});

// update Tripletecategory
tripletecategoryRouter.put('/update', async (req, res) => {

  const tripletecategory = await Tripletecategory.findById(req.body._id);

  //if Tripletecategory exists
  if (tripletecategory) {
    tripletecategory.titletripletecategory = req.body.titletripletecategory || tripletecategory.titletripletecategory;

    const updatedTripletecategory = await tripletecategory.save();
    res.send({

      _id: updatedTripletecategory._id,
      titletripletecategory: updatedTripletecategory.titletripletecategory,

    });
  } else {

    res.status(401).send({ message: '¡.Multiples Categorías NO Encontrado.!' });

  }
});

// for add Tripletecategory -> from admin panel
tripletecategoryRouter.post('/add', async (req, res) => {
  const newTripletecategory = new Tripletecategory({
    titletripletecategory: req.body.titletripletecategory,
  });
  const tripletecategory = await newTripletecategory.save();
  res.send({
    _id: tripletecategory._id,
    titletripletecategory: tripletecategory.titletripletecategory,
  })
});

export default tripletecategoryRouter;