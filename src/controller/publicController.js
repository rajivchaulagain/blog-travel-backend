
import asyncHandler from 'express-async-handler';
import { Blog } from '../models/blogModel.js';

//private bogs

const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find()
    res.json(blogs)
});

const getBlog = asyncHandler(async (req, res) => {
    res.send(`param is ${req.params.id}`)
});

export const publicController = {
    getBlogs,
    getBlog,
};

