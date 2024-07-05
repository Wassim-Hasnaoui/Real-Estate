import pool from '../dbConfig/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface Product {
  productID?: number;
  productName: string;
  description: string;
  category: string;
  price: number;
  countryName: string;
  userName: string;
  status: string;
  current_status: string;
  imageURLs?: string[]; // Optional array for storing multiple image URLs
}

interface Images {
  productImageID?: number;
  imageURL?: string;
  productID?: number;
}

const getProductByID = async (productID: number): Promise<Product | null> => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM products WHERE productID = ?', [productID]);
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
      p.current_status
    FROM 
      products p
    JOIN 
      countrys c ON p.countryID = c.countryID;
  `);
  return rows as Product[];
};

const getProductImagesByProductID = async (productID: number): Promise<Images[]> => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM images_product WHERE productID = ?', [productID]);
  return rows as Images[];
};

const addNewProduct = async (product: Product): Promise<number> => {
  const { productName, description, category, price, countryName, userName, status, current_status } = product;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [productResult] = await connection.query<ResultSetHeader>(
      'INSERT INTO products (productName, description, category, price, countryID, userID, status, current_status) VALUES (?, ?, ?, ?, (SELECT countryID FROM countrys WHERE countryName = ?), (SELECT userID FROM users WHERE userName = ?), ?, ?)',
      [productName, description, category, price, countryName, userName, status, current_status]
    );

    const productID = productResult.insertId;
    await connection.commit();

    return productID; // Return the newly inserted product ID
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const addProductImages = async (productID: number, imageURLs: string[]): Promise<void> => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    for (const imageURL of imageURLs) {
      await connection.query<ResultSetHeader>(
        'INSERT INTO images_product (productID, imageURL) VALUES (?, ?)',
        [productID, imageURL]
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};


const deleteProductByID = async (productID: number): Promise<void> => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Delete associated images first, if necessary
    await connection.query('DELETE FROM images_product WHERE productID = ?', [productID]);

    // Then delete the product itself
    await connection.query('DELETE FROM products WHERE productID = ?', [productID]);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export { getProducts, getProductByID, getProductImagesByProductID, addNewProduct,addProductImages, deleteProductByID, Product, Images };
