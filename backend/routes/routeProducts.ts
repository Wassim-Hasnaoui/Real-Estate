import express from 'express';
import { DeleteProduct, fetchProducts,fetshOneProduct } from '../controllers/ProductsController';

const router = express.Router();

router.get('/all', fetchProducts);
router.get('/one/:id', fetshOneProduct);
router.delete('/remove/:id',DeleteProduct)
export default router