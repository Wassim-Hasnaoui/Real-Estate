import { RowDataPacket, ResultSetHeader } from 'mysql2';
import pool from '../dbConfig/db';

interface Product {
    productID: number;
    productName: string;
    description: string;
    category: string;
    price: number;
    countryName: string;
    status: string;
    current_status: string;
    imageURL: string;
    users_userID:Number;
  }
interface Images {
    productImageID:number; 
  imageURL:string
  productID:number
  }
const getImagesByProductID = async (productID: number): Promise<Images[]> => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM images_product WHERE productID = ?', [productID]);
  return rows.map(row=>({
    productImageID:row.productImageID,
    imageURL:row.imageURL,
    productID:row.productID
  })) as Images[];
};

const getProductByID = async (productID: number): Promise<Product | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(`
        SELECT
            p.productID,
            p.productName,
            p.description,
            p.category,
            p.price,
            c.countryName,
            p.status,
            p.current_status,
           p.users_userID
        FROM
            products p
        JOIN 
        countrys c ON p.countryID = c.countryID 
        WHERE productID=?;`,[productID]);
  return rows.length > 0 ? (rows[0] as Product) : null;
};
const getProducts = async (): Promise<Product[]> => {
    const [rows] = await pool.query<RowDataPacket[]>(`
        SELECT
            p.productID,
            p.productName,
            p.description,
            p.category,
            p.price,
            c.countryName,
            p.status,
            p.current_status,
            p.users_userID,
            (SELECT i.imageURL 
             FROM images_product i 
             WHERE i.productID = p.productID 
             LIMIT 1) AS imageURL
        FROM
            products p
        JOIN 
            countrys c ON p.countryID = c.countryID;
    `);
    return rows.map(row => ({
        productID: row.productID,
        productName: row.productName,
        description: row.description,
        category: row.category,
        price: row.price,
        countryName: row.countryName,
        status: row.status,
        current_status: row.current_status,
        imageURL: row.imageURL,
        users_userID:row.users_userID
    })) as Product[];
};
const deleteProduct = async (productID: number): Promise<void> => {
    await pool.query<ResultSetHeader>('DELETE FROM products WHERE productID = ?', [productID]);
};

const deleteImagesOfProduct = async (productID: number): Promise<void> => {
    await pool.query<ResultSetHeader>('DELETE FROM images_product WHERE productID = ?', [productID]);
};
const getProductsOfUser = async (userID:Number): Promise<Product[]|null> => {
    const [rows] = await pool.query<RowDataPacket[]>(`
        SELECT
            p.productID,
            p.productName,
            p.description,
            p.category,
            p.price,
            c.countryName,
            p.status,
            p.current_status,
            (SELECT i.imageURL 
             FROM images_product i 
             WHERE i.productID = p.productID 
             LIMIT 1) AS imageURL
        FROM
            products p
        JOIN 
            countrys c ON p.countryID = c.countryID 
            WHERE users_userID=?;
    `,[userID]);
    return rows.map(row => ({
        productID: row.productID,
        productName: row.productName,
        description: row.description,
        category: row.category,
        price: row.price,
        countryName: row.countryName,
        status: row.status,
        current_status: row.current_status,
        imageURL: row.imageURL,
        users_userID:row.users_userID
    })) as Product[];
};
const updateCurrentStatusProductToSold = async (productID: number): Promise<void> => {
    await pool.query<ResultSetHeader>('UPDATE products SET current_status = ? WHERE productID = ?', ['sold', productID]);
};

const updateCurrentStatusProductToRented = async (productID: number): Promise<void> => {
    await pool.query<ResultSetHeader>('UPDATE products SET current_status = ? WHERE productID = ?', ['rented', productID]);
};
export { getProducts,getImagesByProductID, getProductByID, 
    Product,deleteProduct,deleteImagesOfProduct,getProductsOfUser,
    updateCurrentStatusProductToRented,updateCurrentStatusProductToSold };