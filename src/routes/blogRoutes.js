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

router.post('/', protect, upload.single("coverImage"), (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        coverImage: req.file.filename,
        description: req.body.description,
        user: req.user.id,
    })
    blog
        .save()
        .then(() => res.json(blog))
        .catch((err) => console.log(err))

});

export default router