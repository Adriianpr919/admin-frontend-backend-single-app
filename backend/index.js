import express, { urlencoded } from 'express'; //"type": "module",
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
///////////////////////////////////////////////////////////////////////////////////////////////
import seedRouter from './routes/seed/seedRoute.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import userRouter from './routes/users/userRoute.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import aboutRouter from './routes/abouts/aboutRoute.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import blogRouter from './routes/blogs/blogRoute.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import bannerRouter from './routes/banners/bannerRoute.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import productRouter from './routes/products/productRoute.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import categoryRouter from './routes/categorias/categoryRoute.js';
import subcategoryRouter from './routes/categorias/subcategoryRoute.js';
import tripletecategoryRouter from './routes/categorias/tripletecategoryRoute.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import orderRouter from './routes/orders/orderRoute.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import messageopcionRouter from './routes/messages/messageRoute.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import colorGoldRouter from './routes/colors/colorGoldRoute.js';
import colorStoneRouter from './routes/colors/colorStoneRoute.js';
///////////////////////////////////////////////////////////////////////////////////////////////
import sizeRouter from './routes/sizes/sizeRoute.js';
///////////////////////////////////////////////////////////////////////////////////////////////

const app = express();
app.use(cors());
//It is used for the put or post method only, so that we can save what we are sending (object, req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
app.use(`/api/seed`, seedRouter);
app.use(`/api/users`, userRouter);
app.use(`/api/messagesopcions`, messageopcionRouter);
app.use(`/api/abouts`, aboutRouter);
app.use(`/api/blogs`, blogRouter);
app.use(`/api/banners`, bannerRouter);
app.use(`/api/products`, productRouter);
app.use(`/api/sizes`, sizeRouter);
app.use(`/api/colorsgolds`, colorGoldRouter);
app.use(`/api/colorsstones`, colorStoneRouter);
app.use(`/api/category`, categoryRouter);
app.use(`/api/subcategory`, subcategoryRouter);
app.use(`/api/tripletecategory`, tripletecategoryRouter);
app.use(`/api/orders`, orderRouter);

//connect with db
dotenv.config();
mongoose.set('autoIndex', false);
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false
  })
  .then(() => {
    console.log("¡.Conectado a Base De Datos.!");
  })
  .catch((error) => {
    console.log(error.message);
  });

//create PORT
const PORT = process.env.MONGOPORT;
const HOSTNAME = process.env.MONGOHOST;
const HTTPS = process.env.HTTPS;
app.listen(PORT, () => {
  console.log(`Que Servidor Es: ${HTTPS}://${HOSTNAME}:${PORT}`);
});
