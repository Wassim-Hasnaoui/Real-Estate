// import { Request, Response, NextFunction } from 'express';
// import multer from 'multer';

// // Define the MulterRequest interface
// export interface MulterRequest extends Request {
//   files?: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[];
// }

// // Middleware to cast the request to MulterRequest
// export const castRequest = (req: Request, res: Response, next: NextFunction): void => {
//   (req as MulterRequest).files = req.files as MulterRequest['files'];
//   next();
// };

