import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  userId?: number; 
}

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, login again' });
  }

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

   
    if (typeof decoded.id !== 'number') {
      throw new Error('Invalid token payload');
    }

   
    req.userId = decoded.id;
    console.log("The ID of the user is", req.userId);

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default authMiddleware;
