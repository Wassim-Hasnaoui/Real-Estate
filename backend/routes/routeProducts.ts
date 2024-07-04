import express from 'express';
import { DeleteProduct, fetchProducts,fetshOneProduct, GetProductsOfUser } from '../controllers/ProductsController';
import authMiddleware from '../middleware/auth';


const router = express.Router();

router.get('/all', fetchProducts);
router.get('/one/:id', fetshOneProduct);
router.delete('/remove/:id',DeleteProduct)
router.get('/userProduct/:id',GetProductsOfUser)
export default router