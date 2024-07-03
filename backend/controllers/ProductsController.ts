import { Request, Response } from 'express';
import {  getProductByID, getProducts, Product,getImagesByProductID } from '../models/modelProducts';
export const fetchProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await getProducts();
       res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};
export const fetshOneProduct=async(req:Request,res:Response):Promise<void>=>{
    try {
        const productID = parseInt(req.params.id)
        const product = await getProductByID(productID);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        const images = await getImagesByProductID(productID);
        res.status(200).json({ ...product, images });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}