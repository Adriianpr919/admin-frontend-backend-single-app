import express from 'express';
import Colorstone from '../../models/colors/colorStoneModel.js';

const colorStoneRouter = express.Router();

// get all colorsstones -> for frontend
colorStoneRouter.get('/all', async (req, res) => {
  const colorsstones = await Colorstone.find();
  res.send(colorsstones);
});

//get colorstone by id
colorStoneRouter.get('/find/:id', async (req, res) => {
  const colorstone = await Colorstone.findById(req.params.id);
  if (colorstone) {
    res.send(colorstone);
  } else {
    res.status(404).send({ message: "¡.Color De Piedra NO Encontrado.!" });
  }
});

//count colorsstones for admin panel
colorStoneRouter.get('/countColorsstones', async (req, res) => {

  try {
    const countColorsstones = await Colorstone.countDocuments();
    res.status(200).json({ count: countColorsstones });

  } catch (err) {
    console.log(err.message);
  }

});

//delete colorstone
colorStoneRouter.delete('/delete/:id', async (req, res) => {

  try {

    await Colorstone.findByIdAndDelete(req.params.id);
    res.status(200).json('¡.Color De Piedra Ha Sido Eliminado.!');

  } catch (err) {
    console.log('¡.NO Se Puede Eliminar.!');
  }

});

// update colorstone
colorStoneRouter.put('/update', async (req, res) => {

  const colorstone = await Colorstone.findById(req.body._id);

  //if colorstone exists
  if (colorstone) {
    colorstone.titlecolorstone = req.body.titlecolorstone || colorstone.titlecolorstone;

    const updatedColorstone = await colorstone.save();
    res.send({

      _id: updatedColorstone._id,
      titlecolorstone: updatedColorstone.titlecolorstone,

    });
  } else {

    res.status(401).send({ message: '¡.Color De Piedra NO Encontrado.!' });

  }
});

// for add colorstone -> from admin panel
colorStoneRouter.post('/add', async (req, res) => {
  const newColorstone = new Colorstone({
    titlecolorstone: req.body.titlecolorstone,
  });
  const colorstone = await newColorstone.save();
  res.send({
    _id: colorstone._id,
    titlecolorstone: colorstone.titlecolorstone,
  })
});

export default colorStoneRouter;