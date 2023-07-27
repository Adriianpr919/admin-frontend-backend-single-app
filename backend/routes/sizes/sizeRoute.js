import express from 'express';
import Size from '../../models/sizes/sizeModel.js';

const sizeRouter = express.Router();

// get all sizes -> for frontend
sizeRouter.get('/all', async (req, res) => {
  const sizes = await Size.find();
  res.send(sizes);
});

//get size by id
sizeRouter.get('/find/:id', async (req, res) => {
  const size = await Size.findById(req.params.id);
  if (size) {
    res.send(size);
  } else {
    res.status(404).send({ message: "¡.Talla NO Encontrado.!" });
  }
});

//count sizes for admin panel
sizeRouter.get('/countSizes', async (req, res) => {

  try {
    const countSizes = await Size.countDocuments();
    res.status(200).json({ count: countSizes });

  } catch (err) {
    console.log(err.message);
  }

});

//delete size
sizeRouter.delete('/delete/:id', async (req, res) => {

  try {

    await Size.findByIdAndDelete(req.params.id);
    res.status(200).json('¡.Talla Ha Sido Eliminado.!');

  } catch (err) {
    console.log('¡.NO Se Puede Eliminar.!');
  }

});

// update size
sizeRouter.put('/update', async (req, res) => {

  const size = await Size.findById(req.body._id);

  //if size exists
  if (size) {
    size.titlesize = req.body.titlesize || size.titlesize;

    const updatedSize = await size.save();
    res.send({

      _id: updatedSize._id,
      titlesize: updatedSize.titlesize,

    });
  } else {

    res.status(401).send({ message: '¡.Talla NO Encontrado.!' });

  }
});

// for add size -> from admin panel
sizeRouter.post('/add', async (req, res) => {
  const newSize = new Size({
    titlesize: req.body.titlesize,
  });
  const size = await newSize.save();
  res.send({
    _id: size._id,
    titlesize: size.titlesize,
  })
});

export default sizeRouter;