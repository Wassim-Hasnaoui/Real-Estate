import pool from '../dbConfig/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface User {
  userID: number;
  UserID(UserID: any): unknown;
  userName: string;
  email: string;
  password: string;
  phone?: string;
  image?: {
    secure_url: string;
    public_id: string;
  };
}

const createUser = async (user: User): Promise<ResultSetHeader> => {
    console.log("reach model user");
    
  const [result] = await pool.query<ResultSetHeader>('INSERT INTO users SET ?', user);
  return result;
};

const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0] as User;
};

const deleteUserByID = async (userID: number): Promise<void> => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Delete associated images of products belonging to the user
    await connection.query('DELETE i FROM images_product i JOIN products p ON i.productID = p.productID WHERE p.userID = ?', [userID]);

    // Delete products belonging to the user
    await connection.query('DELETE FROM products WHERE userID = ?', [userID]);
    
    // Finally, delete the user itself
    await connection.query('DELETE FROM users WHERE userID = ?', [userID]);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};



export { createUser, findUserByEmail, deleteUserByID, User };