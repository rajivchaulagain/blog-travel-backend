
import asyncHandler from 'express-async-handler';
import { Blog } from '../models/blogModel.js';

//private bogs

const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find()
    res.json(blogs)
});

const getBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.json(blog)
});

export const publicController = {
    getBlogs,
    getBlog,
};

