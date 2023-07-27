import express from 'express';
import Banner from '../../models/banners/bannerModel.js';

const bannerRouter = express.Router();

// for add banner -> from admin panel
bannerRouter.post('/add', async (req, res) => {
  const newBanner = new Banner({
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
  });
  const banner = await newBanner.save();
  res.send({
    _id: banner._id,
    title: banner.title,
    image: banner.image,
    description: banner.description,
    author: banner.author
  })
});

// get all banner -> for frontend
bannerRouter.get('/all', async (req, res) => {
  const banners = await Banner.find();
  res.send(banners);
});

//get banner by id -> for frontend
bannerRouter.get('/find/:id', async (req, res) => {
  const banner = await Banner.findById(req.params.id);
  if (banner) {
    res.send(banner);
  } else {
    res.status(404).send({ message: "¡.Carrusel NO Encontrado.!" });
  }
});

//count banner for admin panel
bannerRouter.get('/countBanners', async (req, res) => {

  try {
    const countBanners = await Banner.countDocuments({ author: 'Admin' });
    res.status(200).json({
      author: 'Admin', count: countBanners
    });

  } catch (err) {
    console.log(err.message);
  }

});

//delete banner
bannerRouter.delete('/delete/:id', async (req, res) => {

  try {

    await Banner.findByIdAndDelete(req.params.id);
    res.status(200).json('¡.Carrusel Ha Sido Eliminado.!');

  } catch (err) {
    console.log('¡.NO Se Puede Eliminar.!');
  }

});

// update banner
bannerRouter.put('/update', async (req, res) => {

  const banner = await Banner.findById(req.body._id);

  //if banner exists
  if (banner) {
    banner.title = req.body.title || banner.title;
    banner.image = req.body.image || banner.image;
    banner.description = req.body.description || banner.description;

    const updatedBanner = await banner.save();
    res.send({

      _id: updatedBanner._id,
      title: updatedBanner.title,
      image: updatedBanner.image,
      description: updatedBanner.description,
      author: updatedBanner.author

    });
  } else {

    res.status(401).send({ message: '¡.Carrusel NO Encontrado.!' });

  }
});

export default bannerRouter;