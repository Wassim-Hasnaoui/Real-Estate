import { Request, Response } from 'express';
import {  getProductByID, getProducts, Product } from '../models/modelProducts';
export const fetchProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await getProducts();
       res.status(200).json(products);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: error });
    }
};