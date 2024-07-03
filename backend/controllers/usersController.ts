import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, User } from '../models/modelUsers';
import dotenv from 'dotenv';

dotenv.config();



const generateToken = (userID: number) => {
  return jwt.sign({ userID }, process.env.JWT_SECRET as string);
};

const register = async (req: Request, res: Response) => {
  try {
    const { userName, email, password, image, phone } = req.body;


    const userExists = await findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
console.log("email",email);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      userName,
      email,
      password: hashedPassword,
      image,
      phone,
    };
console.log("new user",newUser);

    const createdUser = await createUser(newUser);
   

    res.status(201).json({success:true,message:"logged success",createdUser});
  } catch (error) {
    console.log('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    if (!user.userID ) {
        return res.status(500).json({ message: 'User ID is missing' });
      }
    const token = generateToken(user.userID);
    res.json({ success: true, token });
  } catch (error) {
    console.log('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { register, login };
