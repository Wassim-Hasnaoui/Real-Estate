import { Request, Response, NextFunction } from 'express';
import multer from 'multer'; // Import multer without curly braces

// Define the MulterRequest interface
export interface MulterRequest extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[];
}

// Middleware to cast the request to MulterRequest
export const castRequest = (req: Request, res: Response, next: NextFunction): void => {
  (req as MulterRequest).files = req.files as MulterRequest['files']; // Cast req.files to MulterRequest['files']
  next();
};
