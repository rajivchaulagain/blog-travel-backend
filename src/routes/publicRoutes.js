import express from 'express';

import { publicController } from '../controller/publicController.js';

const router = express.Router();

router.get('/', publicController.getBlogs);

router.get('/:id', publicController.getBlog);

export default router