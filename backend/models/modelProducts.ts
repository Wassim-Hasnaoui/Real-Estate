import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../dbConfig/db';
import { Images } from '../types/image';
import { Product } from '../types/product';

const getImagesByProductID = async (productID: number): Promise<Images[]> => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM images_product WHERE productID = ?', [productID]);
  return rows.map(row => ({
    productImageID: row.productImageID,
    imageURL: row.imageURL,
    productID: row.productID
  })) as Images[];
};

const getProductByID = async (productID: number): Promise<Product | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
    SELECT
      p.productID,
      p.productName,
      p.description,
      p.category,
      p.price,
      c.countryID,
      c.countryName,
      p.status,
      p.current_status,
      p.users_userID as userID,
      GROUP_CONCAT(i.imageURL) AS imageURLs
    FROM
      products p
    LEFT JOIN images_product i ON p.productID = i.productID
    JOIN countrys c ON p.countryID = c.countryID
    WHERE p.productID = ?
    GROUP BY p.productID;
    `,
    [productID]
  );

  if (rows.length === 0) {
    return null;
  }

  const firstRow = rows[0];
  return {
    productID: firstRow.productID,
    productName: firstRow.productName,
    description: firstRow.description,
    category: firstRow.category,
    price: firstRow.price,
    status: firstRow.status,
    current_status: firstRow.current_status,
    countryID: firstRow.countryID,
    countryName: firstRow.countryName,
    userID: firstRow.userID,
    imageURLs: firstRow.imageURLs ? firstRow.imageURLs.split(',') : []
  };
};

const getProducts = async (): Promise<Product[]> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
    SELECT
      p.productID,
      p.productName,
      p.description,
      p.category,
      p.price,
      c.countryID,
      c.countryName,
      p.status,
      p.current_status,
      p.users_userID as userID,
      GROUP_CONCAT(i.imageURL) AS imageURLs
    FROM
      products p
    LEFT JOIN images_product i ON p.productID = i.productID
    JOIN countrys c ON p.countryID = c.countryID
    GROUP BY p.productID;
    `
  );

  return rows.map(row => ({
    productID: row.productID,
    productName: row.productName,
    description: row.description,
    category: row.category,
    price: row.price,
    status: row.status,
    current_status: row.current_status,
    countryID: row.countryID,
    countryName: row.countryName,
    userID: row.userID,
    imageURLs: row.imageURLs ? row.imageURLs.split(',') : []
  })) as Product[];
};

const deleteProduct = async (productID: number): Promise<void> => {
  await pool.query<ResultSetHeader>('DELETE FROM products WHERE productID = ?', [productID]);
};

const deleteImagesOfProduct = async (productID: number): Promise<void> => {
  await pool.query<ResultSetHeader>('DELETE FROM images_product WHERE productID = ?', [productID]);
};

const getProductsOfUser = async (userID: number): Promise<Product[]> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
    SELECT
      p.productID,
      p.productName,
      p.description,
      p.category,
      p.price,
      c.countryID,
      c.countryName,
      p.status,
      p.current_status,
      p.users_userID as userID,
      GROUP_CONCAT(i.imageURL) AS imageURLs
    FROM
      products p
    LEFT JOIN images_product i ON p.productID = i.productID
    JOIN countrys c ON p.countryID = c.countryID
    WHERE p.users_userID = ?
    GROUP BY p.productID;
    `,
    [userID]
  );

  return rows.map(row => ({
    productID: row.productID,
    productName: row.productName,
    description: row.description,
    category: row.category,
    price: row.price,
    status: row.status,
    current_status: row.current_status,
    countryID: row.countryID,
    countryName: row.countryName,
    userID: row.userID,
    imageURLs: row.imageURLs ? row.imageURLs.split(',') : []
  })) as Product[];
};

const updateCurrentStatusProductToSold = async (productID: number, userID: number): Promise<void> => {
  await pool.query<ResultSetHeader>(
    'UPDATE products SET current_status = ?, users_userID = ? WHERE productID = ?',
    ['sold', userID, productID]
  );
};

const updateCurrentStatusProductToRented = async (productID: number): Promise<void> => {
  await pool.query<ResultSetHeader>('UPDATE products SET current_status = ? WHERE productID = ?', ['rented', productID]);
};

const updateProduct = async (productID: number, product: Partial<Product>): Promise<void> => {
  const { productName, description, category, price, status, current_status, countryID, userID } = product;
  await pool.query<ResultSetHeader>(
    `
    UPDATE products
    SET productName = ?, description = ?, category = ?, price = ?, status = ?, current_status = ?, countryID = ?, users_userID = ?
    WHERE productID = ?
    `,
    [productName, description, category, price, status, current_status, countryID, userID, productID]
  );
};

const addImageForProduct = async (productID: number, imageURL: string): Promise<void> => {
  await pool.query<ResultSetHeader>('INSERT INTO images_product (productID, imageURL) VALUES (?, ?)', [productID, imageURL]);
};

const addProducts = async (product: Product): Promise<number> => {
  try {
    await pool.query('START TRANSACTION');

    const [result] = await pool.query<ResultSetHeader>(
      `
      INSERT INTO products (productName, description, category, price, countryID, status, current_status, users_userID)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        product.productName,
        product.description,
        product.category,
        product.price,
        product.countryID,
        product.status,
        product.current_status,
        product.userID
      ]
    );

    await pool.query('COMMIT');

    return result.insertId;
  } catch (error) {
    await pool.query('ROLLBACK');
    throw error;
  }
};

export {
  getImagesByProductID,
  getProductByID,
  getProducts,
  deleteProduct,
  deleteImagesOfProduct,
  getProductsOfUser,
  updateCurrentStatusProductToSold,
  updateCurrentStatusProductToRented,
  updateProduct,
  addImageForProduct,
  addProducts
};
