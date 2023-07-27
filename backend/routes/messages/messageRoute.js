import express from 'express';
import Messageopcion from '../../models/messages/messageModel.js';

const messageopcionRouter = express.Router();

// for register messageopcion
messageopcionRouter.post('/add', async (req, res) => {
  const newMessageopcion = new Messageopcion({
    fullname: req.body.fullname,
    comment: req.body.comment,
  });
  const messageopcion = await newMessageopcion.save();
  res.send({
    _id: messageopcion._id,
    fullname: messageopcion.fullname,
    comment: messageopcion.comment,
    isAdmin: messageopcion.isAdmin
  })
});

// get all messageopcion -> for admin panel
messageopcionRouter.get('/all', async (req, res) => {
  const messagesopcions = await Messageopcion.find();
  res.send(messagesopcions);
});

//get messageopcion by id -> for admin panel
messageopcionRouter.get('/find/:id', async (req, res) => {
  const messageopcion = await Messageopcion.findById(req.params.id);
  if (messageopcion) {
    res.send(messageopcion);
  } else {
    res.status(404).send({ message: "¡.Mensaje NO Encontrado.!" });
  }
});

//count messageopcion for admin panel
messageopcionRouter.get('/countMessagesopcions', async (req, res) => {

  try {
    //i want only non-admin messagesopcions
    const countMessagesopcions = await Messageopcion.countDocuments({ isAdmin: false });
    res.status(200).json({
      isAdmin: false, count: countMessagesopcions
    });

  } catch (err) {
    console.log(err.message);
  }

});

//delete messageopcion
messageopcionRouter.delete('/delete/:id', async (req, res) => {

  try {

    await Messageopcion.findByIdAndDelete(req.params.id);
    res.status(200).json('¡.Mensaje Ha Sido Eliminado.!');

  } catch (err) {
    console.log('¡.NO Se Puede Eliminar.!');
  }

});

export default messageopcionRouter;