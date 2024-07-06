// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: 'your_cloud_name',
//   api_key: 'your_api_key',
//   api_secret: 'your_api_secret',
// });

// export const uploadImage = async (file: Express.File): Promise<UploadApiResponse> => {
//   return cloudinary.uploader.upload(file.path, {
//     folder: 'products',
//     public_id: `product_${file.originalname}`,
//   });
// };

// export default cloudinary;