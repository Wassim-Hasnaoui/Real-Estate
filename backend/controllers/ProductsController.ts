import { Request, Response } from 'express';
import {  getProductByID, getProducts, Product,getImagesByProductID
    ,deleteProduct,deleteImagesOfProduct,
    getProductsOfUser,
    updateCurrentStatusProductToSold,
    updateCurrentStatusProductToRented
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
        const productID = parseInt(req.params.id, 10); // Parse `productID` as an integer with radix 10

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
