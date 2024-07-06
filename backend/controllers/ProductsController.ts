import {
  Request,
  Response,
} from 'express';

import {
  addImageForProduct,
  addProducts,
  deleteImagesOfProduct,
  deleteProduct,
  getImagesByProductID,
  getProductByID,
  getProducts,
  getProductsOfUser,
  updateCurrentStatusProductToRented,
  updateCurrentStatusProductToSold,
  updateProduct,
} from '../models/modelProducts';
import { Product } from '../types/product';
import multer from 'multer';

export const fetchProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

export const fetchOneProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productID = parseInt(req.params.id); 

        if (isNaN(productID)) {
            res.status(400).json({ message: 'Invalid product ID' });
            return;
        }

        const product = await getProductByID(productID);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        const images = await getImagesByProductID(productID);
        res.status(200).json({ ...product, images });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        const productID = parseInt(req.params.id);
        const product = await getProductByID(productID);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        console.log("reach product", product);
        await deleteImagesOfProduct(productID);
        await deleteProduct(productID);

        res.status(200).json({ success: true, message: 'Product and its images deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, success: false });
    }
};

export const getProductsOfUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userID = parseInt(req.params.id); // Parse `userID` as an integer with radix 10
        if (isNaN(userID)) {
            res.status(400).json({ message: 'Invalid user ID' });
            return;
        }
        const products = await getProductsOfUser(userID);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

export const updateCurrentStatusProductToSoldController = async (req: Request, res: Response): Promise<void> => {
    try {
        const productID = parseInt(req.params.id);
        const product = await getProductByID(productID);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        await updateCurrentStatusProductToSold(productID);
        res.status(200).json({ success: true, message: 'Product status updated to sold successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, success: false });
    }
};

export const updateCurrentStatusProductToRentedController = async (req: Request, res: Response): Promise<void> => {
    try {
        const productID = parseInt(req.params.id);
        const product = await getProductByID(productID);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        await updateCurrentStatusProductToRented(productID);
        res.status(200).json({ success: true, message: 'Product status updated to rented successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, success: false });
    }
};

export const updateProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        const productID = parseInt(req.params.id);
        const product = await getProductByID(productID);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        const updatedProduct: Partial<Product> = req.body;
        await updateProduct(productID, updatedProduct);

        res.status(200).json({ success: true, message: 'Product updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, success: false });
    }
};

export const createProductWithImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productName, description, category, price, status, current_status, countryID, userID } = req.body;
    const imageFiles = req.files as { [fieldname: string]: Express.Multer.File[] };
  console.log("imagesfile",imageFiles);

    // Log the image files array before mapping
    console.log('Image files before mapping:', imageFiles);
    // Create a new product object
    const newProduct = {
      productName,
      description,
      category,
      price,
      status,
      current_status,
      countryID,
      userID,
    };

    // Add the product and get the inserted productID
    const insertedProductID = await addProducts(newProduct);

    // Log the inserted product ID
    console.log('Inserted Product ID:', insertedProductID);

    if (imageFiles && imageFiles.images) {
      for (const file of imageFiles.images) {
        const imageURL = file.path; 
          console.log("imageforloburl",imageURL);
          await addImageForProduct(insertedProductID, imageURL);
        }
      }
    

    res.status(200).json({ success: true, message: 'Product and images added successfully' });
  } catch (error: any) {
    console.error('Error creating product with images:', error);
    res.status(500).json({ success: false, message: 'Failed to add product with images', error: error.message });
  }
};
