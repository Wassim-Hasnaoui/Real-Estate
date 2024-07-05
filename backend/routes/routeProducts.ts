import express from 'express';
import { DeleteImage, DeleteProduct, fetchProducts,fetshOneProduct, GetProductsOfUser, updateProductController, UpdateProductCurrentStatusToRented, UpdateProductCurrentStatusToSold } from '../controllers/ProductsController';
import authMiddleware from '../middleware/auth';
import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'products/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const uploadsPath = path.join(__dirname,'../products');

  const upload =multer({storage:storage});

const router = express.Router();
router.use('/products', express.static(uploadsPath));
router.get('/all',fetchProducts);
router.get('/one/:id',fetshOneProduct);
router.delete('/remove/:id',DeleteProduct)
router.get('/userProduct',authMiddleware,GetProductsOfUser)
router.post("/rented/:id",UpdateProductCurrentStatusToRented)
router.post("/sold/:id",UpdateProductCurrentStatusToSold)
router.put("/update/:productID",upload.fields([{ name: 'images', maxCount: 10 }]),updateProductController)
router.delete("/delete/image/:imageID",DeleteImage)
export default router