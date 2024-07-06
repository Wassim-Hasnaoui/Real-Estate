import express from 'express';
import multer from 'multer';
import { fetchProducts, fetchOneProduct, deleteProductController, getProductsOfUserController, updateProductController, updateCurrentStatusProductToSoldController, updateCurrentStatusProductToRentedController, createProductWithImages } from '../controllers/ProductsController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'products/'); // Destination directory for storing uploaded images
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Naming convention for uploaded files
    }
  });

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // Set the file size limit to 50MB
  });

// Route for fetching all products
router.get('/all', fetchProducts);

// Route for fetching a single product by ID
router.get('/one/:id', fetchOneProduct);

// Route for deleting a product by ID
router.delete('/remove/:id', deleteProductController);

// Route for fetching products of a specific user (requires authentication)
router.get('/userProducts', authMiddleware, getProductsOfUserController);

// Route for updating product status to rented
router.post('/rented/:id', updateCurrentStatusProductToRentedController);

// Route for updating product status to sold
router.post('/sold/:id', updateCurrentStatusProductToSoldController);

// Route for adding a new product with multiple images
router.post('/add', upload.fields([{ name: 'images', maxCount: 10 }]), createProductWithImages);

// Route for updating a product (including images)
router.put('/update/:productID', upload.array('images', 10), updateProductController);

export default router;
