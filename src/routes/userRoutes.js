import express from 'express';

import { userController } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me' , protect , userController.getUser);

router.post('/register', userController.register);

router.post('/login', userController.login);

export default router