import express from 'express';
import { fetchProducts,fetshOneProduct } from '../controllers/ProductsController';

const router = express.Router();

router.get('/all', fetchProducts);
router.get('/one/:id', fetshOneProduct);
export default router