import { Request, Response } from 'express';
import {  getProductByID, getProducts, Product,getImagesByProductID
    ,deleteProduct,deleteImagesOfProduct,
    getProductsOfUser,
    updateCurrentStatusProductToSold,
    updateCurrentStatusProductToRented,
    updateProduct,
    findImageByURLAndProductID,
    addImageForProduct,
    deleteImageByID,
    updateCurrentStatusProductToAvailable,
    addProducts
 } from '../models/modelProducts';


export const fetchProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await getProducts();
       res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};
export const fetshOneProduct = async (req: Request, res: Response): Promise<void> => {
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
export const DeleteProduct=async(req:Request,res:Response):Promise<void>=>{
    try {
        const productID = parseInt(req.params.id);
        const product = await getProductByID(productID);
        if (!product){
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        console.log("reach product",product);
        await deleteImagesOfProduct(productID);

        await deleteProduct(productID);
       
        res.status(200).json({ success:true,message: 'Product and its images deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error,success:false });
    }
}
export const GetProductsOfUser=async(req:Request,res:Response):Promise<void>=>{
 const userID=req.body.userId
    try {
        console.log("userid is",userID);
        
        const ProductsOfUser = await getProductsOfUser(userID);
       res.status(200).json({success:true,ProductsOfUser});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    
    }
}

export const UpdateProductCurrentStatusToSold = async (req: Request, res: Response): Promise<void> => {
    try {
        const productID = parseInt(req.params.id);
        
        await updateCurrentStatusProductToSold(productID,req.body.userId);
        res.status(200).json({ success: true, message: 'Product status updated to sold' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

export const UpdateProductCurrentStatusToRented = async (req: Request, res: Response): Promise<void> => {
    try {
        const productID = parseInt(req.params.id);
        await updateCurrentStatusProductToRented(productID);
        res.status(200).json({ success: true, message: 'Product status updated to rented' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};
export const updateProductController = async (req: Request, res: Response) => {
    const productID = parseInt(req.params.productID);
    const productData = req.body;
    try {
      const existingProduct = await getProductByID(productID);
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
     console.log("existproduct",existingProduct);
     console.log("productdata",productData);
     
      const updatedProduct :Partial<Product> = {
        productName: productData.productName || existingProduct.productName,
        description: productData.description || existingProduct.description,
        category: productData.category || existingProduct.category,
        price: productData.price || existingProduct.price,
        status: productData.status || existingProduct.status,
        current_status: productData.current_status || existingProduct.current_status,
        countryID: productData.countryID || existingProduct.countryID,
        users_userID: productData.users_userID || existingProduct.users_userID,
      };
      console.log("updatedproduct",updatedProduct);
      
      await updateProduct(productID,updatedProduct);
  
      res.status(200).json({message:'Product updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
    }
  };
  export const DeleteImage=async(req:Request,res:Response):Promise<void>=>{
    try {
        const imageID = parseInt(req.params.imageID);
      await deleteImageByID(imageID);    
        res.status(200).json({ success:true,message: 'image  deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error,success:false });
    }
  }

  export const addImagesForProduct = async (req: Request, res: Response) => {
    const productID = parseInt(req.params.productID);
    
    const imageFiles = req.files as { [fieldname: string]: Express.Multer.File[] };
  console.log("imagesfile",imageFiles);
  
    try {
      const existingProduct = await getProductByID(productID);
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
     console.log("existproduct",existingProduct);

      if (imageFiles && imageFiles.images) {
        for (const file of imageFiles.images) {
          const imageURL = file.path; 
  console.log("imageforloburl",imageURL);
          const existingImage = await findImageByURLAndProductID(productID, imageURL);
         console.log("exist image",existingImage);
   if (!existingImage) {
            await addImageForProduct(productID, imageURL);
          }
        }
      }
  
      res.status(200).json({message:'images added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding image', error });
    }
  };  
  export const markProductAsAvailable = async (req: Request, res: Response) => {
    const productID = parseInt(req.params.productID);
   

    try {
        await updateCurrentStatusProductToAvailable(productID);
        res.status(200).json({ message: 'Product status updated to available' });
    } catch (error) {
        console.error('Error updating product status:', error);
        res.status(500).json({ message: 'Failed to update product status', error });
    }
};
export const createProductWithImages = async (req: Request, res: Response): Promise<void> => {
    try {
      const { productName, description, category, price, status, current_status, countryID, userId } = req.body;
      const imageFiles = req.files as { [fieldname: string]: Express.Multer.File[] };
  
      const newProduct = {
        productName,
        description,
        category,
        price,
        status,
        current_status,
        countryID,
       users_userID: userId,
      };
  
     
      const insertedProductID = await addProducts(newProduct);
  
      if (imageFiles && imageFiles.images) {
        for (const file of imageFiles.images) {
          const imageURL = file.path;
          await addImageForProduct(insertedProductID, imageURL);
        }
      }
  
    
   
  
      res.status(200).json({ success: true, message: 'Product and images added successfully' });
    }
      catch (error) {
      console.log('Error creating product with images:', error);
      res.status(500).json({ success: false, message: 'Failed to add product with images', error: error });
    }
}
