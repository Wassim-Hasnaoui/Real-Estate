import { Response } from 'express';
import { MulterRequest } from '../multermid/multerreq'; // Import MulterRequest interface
import { getProducts, addNewProduct, getProductByID, deleteProductByID, getProductImagesByProductID } from '../models/modelProducts';
import cloudinary from '../utils/cloudinary'; // Default import
import { UploadApiResponse } from 'cloudinary';

interface Product {
  productName: string;
  description: string;
  category: string;
  price: number;
  countryName: string;
  userName: string;
  status: string;
  current_status: string;
  imageURLs: string[]; // Updated to store multiple image URLs
}

export const fetchProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const addProducts = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    const { productName, description, category, price, countryName, userName, status, current_status } = req.body;

    const imageURLs: string[] = [];

    // Add Cloudinary upload logic here
    if (req.files && Array.isArray(req.files['images'])) {
      const files = req.files['images'] as Express.Multer.File[];

      for (const image of files) {
        const uploadResult = await cloudinary.uploader.upload(image.path, {
          folder: 'products',
          public_id: `product_${productName}`,
        });

        imageURLs.push(uploadResult.secure_url);
      }
    }

    const newProduct: Product = {
      productName,
      description,
      category,
      price,
      countryName,
      userName,
      status,
      current_status,
      imageURLs,
    };

    await addNewProduct(newProduct);
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
};

export const getOneProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = Number(req.params.productId); // Assuming productId is passed as a route parameter

  try {
    const product = await getProductByID(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    // Fetch images for the product
    const images = await getProductImagesByProductID(productId);
    const productWithImages: Product = {
      ...product,
      imageURLs: images.map((img) => img.imageURL).filter((url) => url !== undefined) as string[],
    };

    res.status(200).json(productWithImages);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = Number(req.params.productId); // Assuming productId is passed as a route parameter

  try {
    await deleteProductByID(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
