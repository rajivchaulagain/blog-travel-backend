import express from 'express';

import { blogController } from '../controller/blogController.js';
import { upload } from '../middleware/attachmentMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';
import { Blog } from '../models/blogModel.js';

const router = express.Router();

router.get('/', protect, blogController.getBlogs);

router.get('/:id', protect, blogController.getBlog);

router.put('/:id', protect, blogController.updateBlog);

router.delete('/:id', protect, blogController.deleteBlog);

router.post('/', protect, upload.single("coverImage"), blogController.createBlog);

export default router