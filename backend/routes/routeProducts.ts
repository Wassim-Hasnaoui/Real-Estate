import express from 'express';
import { fetchProducts, } from '../controllers/ProductsController';

const router = express.Router();

router.get('/all', fetchProducts);
export default router