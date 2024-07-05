import express, { Request, Response } from 'express';
import promisePool from './dbConfig/db';
import cors from "cors";
import userRouter from "./routes/routeUsers"
import productRoute from "./routes/routeProducts"
import countryRoute from "./routes/countryRoute"
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
promisePool
app.use("/api/user",userRouter);
app.use("/api/products",productRoute);
app.use("/api/countrys", countryRoute);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});