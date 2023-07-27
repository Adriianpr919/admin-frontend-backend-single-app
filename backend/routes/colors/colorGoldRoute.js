import express from 'express';
import Colorgold from '../../models/colors/colorGoldModel.js';

const colorGoldRouter = express.Router();

// get all colorsgolds -> for frontend
colorGoldRouter.get('/all', async (req, res) => {
  const colorsgolds = await Colorgold.find();
  res.send(colorsgolds);
});

//get colorgold by id
colorGoldRouter.get('/find/:id', async (req, res) => {
  const colorgold = await Colorgold.findById(req.params.id);
  if (colorgold) {
    res.send(colorgold);
  } else {
    res.status(404).send({ message: "¡.Color De Oro NO Encontrado.!" });
  }
});

//count colorsgolds for admin panel
colorGoldRouter.get('/countColorsgolds', async (req, res) => {

  try {
    const countColorsgolds = await Colorgold.countDocuments();
    res.status(200).json({ count: countColorsgolds });

  } catch (err) {
    console.log(err.message);
  }

});

//delete colorgold
colorGoldRouter.delete('/delete/:id', async (req, res) => {

  try {

    await Colorgold.findByIdAndDelete(req.params.id);
    res.status(200).json('¡.Color De Oro Ha Sido Eliminado.!');

  } catch (err) {
    console.log('¡.NO Se Puede Eliminar.!');
  }

});

// update colorgold
colorGoldRouter.put('/update', async (req, res) => {

  const colorgold = await Colorgold.findById(req.body._id);

  //if colorgold exists
  if (colorgold) {
    colorgold.titlecolorgold = req.body.titlecolorgold || colorgold.titlecolorgold;

    const updatedColorgold = await colorgold.save();
    res.send({

      _id: updatedColorgold._id,
      titlecolorgold: updatedColorgold.titlecolorgold,

    });
  } else {

    res.status(401).send({ message: '¡.Color De Oro NO Encontrado.!' });

  }
});

// for add colorgold -> from admin panel
colorGoldRouter.post('/add', async (req, res) => {
  const newColorgold = new Colorgold({
    titlecolorgold: req.body.titlecolorgold,
  });
  const colorgold = await newColorgold.save();
  res.send({
    _id: colorgold._id,
    titlecolorgold: colorgold.titlecolorgold,
  })
});

export default colorGoldRouter;