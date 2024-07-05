import express from 'express';
import { register, login, deleteUser } from '../controllers/usersController';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/:userId', deleteUser);


export default router;