import { Router, Request, Response } from 'express';
import { fetchProducts, addProducts, getOneProduct, deleteProduct } from '../controllers/ProductsController';
import { authMiddleware } from '../multermid/multerreq';
import multer from 'multer';
import { MulterRequest } from '../multermid/multerreq'; // Import MulterRequest interface

const router = Router();

// Define Multer upload middleware
const upload = multer(); // Configure multer as needed for file uploads

// Routes
router.get('/all', fetchProducts);
router.get('/:productId', getOneProduct);
router.delete('/:productId', authMiddleware, deleteProduct);

// POST route for adding products with file upload middleware
router.post('/add', upload.array('images', 10), addProducts);

export default router;
