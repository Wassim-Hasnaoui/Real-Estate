import express from 'express';
import { addImagesForProduct, DeleteImage, DeleteProduct, 
    fetchProducts,fetshOneProduct, GetProductsOfUser, 
    markProductAsAvailable, updateProductController, 
    UpdateProductCurrentStatusToRented, UpdateProductCurrentStatusToSold } 
    from '../controllers/ProductsController';
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
router.post("/sold/:id",authMiddleware,UpdateProductCurrentStatusToSold)
router.put("/update/:productID",updateProductController)
router.delete("/delete/image/:imageID",DeleteImage)
router.post("/add/images/:productID",upload.fields([{ name: 'images', maxCount: 10 }]),addImagesForProduct)
router.post("/available/:productID",markProductAsAvailable)
export default router