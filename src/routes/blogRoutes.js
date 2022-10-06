import express from 'express';

import { blogController } from '../controller/blogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect , blogController.getBlogs);

router.get('/:id', protect, blogController.getBlog);

router.put('/:id', protect, blogController.updateBlog);

router.delete('/:id', protect, blogController.deleteBlog);

router.post('/', protect , blogController.createBlog);

export default router