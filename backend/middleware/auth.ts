import {
  NextFunction,
  Request,
  Response,
} from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  userId?: number; 
}


const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader); 

  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Not authorized, login again' });
  }

  
  const token = authHeader.split(' ')[1]; 
  console.log("Token:", token); 

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, login again2' });
  }
console.log("token is ",token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    if (typeof decoded !== 'object' || !decoded.userID) {
      throw new Error('Invalid token payload');
    }

    req.body.userId = decoded.userID;
    console.log("The ID of the user is", req.body.userId);

    next();
  } catch (error) {
    console.log('Token verification failed:', error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export { authMiddleware };
