import express from 'express';
import { register, login, GetOneUserByID } from '../controllers/usersController';
import multer from 'multer';
import authMiddleware from '../middleware/auth';
const upload = multer();
const router = express.Router();

router.post('/register',upload.single('image'), register);
router.post('/login', login);
router.get('/one',authMiddleware,GetOneUserByID);


export default router;