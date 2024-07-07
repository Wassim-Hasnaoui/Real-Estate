import cors from 'cors';
import express from 'express';

import promisePool from './dbConfig/db';
import countryRoute from './routes/countryRoute';
import userRouter from './routes/routeUsers';
import productsRoute from './routes/routeProducts';
import multer from 'multer';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 5000;



app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cors());
app.use(express.json());
promisePool
app.use("/api/user",userRouter);
app.use("/api/products",productsRoute);
app.use("/api/countrys", countryRoute);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});