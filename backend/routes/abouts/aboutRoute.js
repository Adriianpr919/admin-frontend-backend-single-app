import express from 'express';
import About from '../../models/abouts/aboutModel.js';

const aboutRouter = express.Router();

// for add about -> from admin panel
aboutRouter.post('/add', async (req, res) => {
  const newAbout = new About({
    imageOne: req.body.imageOne,
    titleOne: req.body.titleOne,
    descriptionOne: req.body.descriptionOne,
    titleTwo: req.body.titleTwo,
    descriptionTwo: req.body.descriptionTwo,
    titleThree: req.body.titleThree,
    descriptionThree: req.body.descriptionThree,
    imageFour: req.body.imageFour,
    titleFour: req.body.titleFour,
    descriptionFour: req.body.descriptionFour,
    titleFive: req.body.titleFive,
    imageMother: req.body.imageMother,
    imageDaughter: req.body.imageDaughter,
  });
  const about = await newAbout.save();
  res.send({
    _id: about._id,
    imageOne: about.imageOne,
    titleOne: about.titleOne,
    descriptionOne: about.descriptionOne,
    titleTwo: about.titleTwo,
    descriptionTwo: about.descriptionTwo,
    titleThree: about.titleThree,
    descriptionThree: about.descriptionThree,
    imageFour: about.imageFour,
    titleFour: about.titleFour,
    descriptionFour: about.descriptionFour,
    titleFive: about.titleFive,
    imageMother: about.imageMother,
    imageDaughter: about.imageDaughter
  })
});

// get all about -> for frontend
aboutRouter.get('/all', async (req, res) => {
  const abouts = await About.find();
  res.send(abouts);
});

//get about by id -> for frontend
aboutRouter.get('/find/:id', async (req, res) => {
  const about = await About.findById(req.params.id);
  if (about) {
    res.send(about);
  } else {
    res.status(404).send({ message: "¡.Acerca De NO Encontrado.!" });
  }
});

//count about for admin panel
aboutRouter.get('/countAbouts', async (req, res) => {

  try {
    const countAbouts = await About.countDocuments();
    res.status(200).json({ count: countAbouts });

  } catch (err) {
    console.log(err.message);
  }

});

//delete about
aboutRouter.delete('/delete/:id', async (req, res) => {

  try {

    await About.findByIdAndDelete(req.params.id);
    res.status(200).json('¡.Acerca De Ha Sido Eliminado.!');

  } catch (err) {
    console.log('¡.NO Se Puede Eliminar.!');
  }

});

// update about
aboutRouter.put('/update', async (req, res) => {

  const about = await About.findById(req.body._id);

  //if about exists
  if (about) {
    about.imageOne = req.body.imageOne || about.imageOne;
    about.titleOne = req.body.titleOne || about.titleOne;
    about.descriptionOne = req.body.descriptionOne || about.descriptionOne;
    about.titleTwo = req.body.titleTwo || about.titleTwo;
    about.descriptionTwo = req.body.descriptionTwo || about.descriptionTwo;
    about.titleThree = req.body.titleThree || about.titleThree;
    about.descriptionThree = req.body.descriptionThree || about.descriptionThree;
    about.imageFour = req.body.imageFour || about.imageFour;
    about.titleFour = req.body.titleFour || about.titleFour;
    about.descriptionFour = req.body.descriptionFour || about.descriptionFour;
    about.titleFive = req.body.titleFive || about.titleFive;
    about.imageMother = req.body.imageMother || about.imageMother;
    about.imageDaughter = req.body.imageDaughter || about.imageDaughter;

    const updatedAbout = await about.save();
    res.send({

      _id: updatedAbout._id,
      imageOne: updatedAbout.imageOne,
      titleOne: updatedAbout.titleOne,
      descriptionOne: updatedAbout.descriptionOne,
      titleTwo: updatedAbout.titleTwo,
      descriptionTwo: updatedAbout.descriptionTwo,
      titleThree: updatedAbout.titleThree,
      descriptionThree: updatedAbout.descriptionThree,
      imageFour: updatedAbout.imageFour,
      titleFour: updatedAbout.titleFour,
      descriptionFour: updatedAbout.descriptionFour,
      titleFive: updatedAbout.titleFive,
      imageMother: updatedAbout.imageMother,
      imageDaughter: updatedAbout.imageDaughter

    });
  } else {

    res.status(401).send({ message: '¡.Acerca De NO Encontrado.!' });

  }
});

export default aboutRouter;