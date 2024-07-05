import { Request, Response } from 'express';
import {  getProductByID, getProducts, Product,getImagesByProductID
    ,deleteProduct,deleteImagesOfProduct,
    getProductsOfUser,
    updateCurrentStatusProductToSold,
    updateCurrentStatusProductToRented,
    updateProduct,
    findImageByURLAndProductID,
    addImageForProduct
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
        const productID = parseInt(req.params.id); // Parse `productID` as an integer with radix 10

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
        await updateCurrentStatusProductToSold(productID);
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
    const imageFiles = req.files as { [fieldname: string]: Express.Multer.File[] };
  console.log("imagesfile",imageFiles);
  
    try {
      const existingProduct = await getProductByID(productID);
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
     
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

      await updateProduct(productID,
        
        
        updatedProduct);
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
  
      res.status(200).json({message:'Product updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
    }
  };