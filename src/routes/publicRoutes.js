import express from 'express';

import { publicController } from '../controller/publicController.js';

const router = express.Router();

router.get('/', publicController.getBlogs);

router.get('/recent/blogs', publicController.getRecentBlogs)

router.get('/:id', publicController.getBlog);

export default router