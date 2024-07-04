import express from 'express';
import { DeleteProduct, fetchProducts,fetshOneProduct, GetProductsOfUser, UpdateProductCurrentStatusToRented, UpdateProductCurrentStatusToSold } from '../controllers/ProductsController';
import authMiddleware from '../middleware/auth';


const router = express.Router();

router.get('/all', fetchProducts);
router.get('/one/:id', fetshOneProduct);
router.delete('/remove/:id',DeleteProduct)
router.get('/userProduct',authMiddleware,GetProductsOfUser)
router.post("/rented/:id",UpdateProductCurrentStatusToRented)
router.post("/sold/:id",UpdateProductCurrentStatusToSold)
export default router