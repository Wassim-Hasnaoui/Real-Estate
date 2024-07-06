import pool from '../dbConfig/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Product } from '../types/product';

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
const getOneUserByID = async (userID: string): Promise<User | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE userID = ?', [userID]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0] as User;
  };
export { createUser, findUserByEmail, User ,getOneUserByID};
