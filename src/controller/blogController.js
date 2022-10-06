
import asyncHandler from 'express-async-handler';
import { Blog } from '../models/blogModel.js';

//private bogs

const getBlogs = asyncHandler(async (req, res) => {
    console.log("blogs" , req.user);
    const blogs = await Blog.find({ user: req.user._id })
    res.json(blogs)
});

const getBlog = asyncHandler(async (req, res) => {
    res.send(`param is ${req.params.id}`)
});

const updateBlog = asyncHandler(async (req, res) => {
    res.send(`param is ${req.params.id}`)
});

const deleteBlog = asyncHandler(async (req, res) => {
    res.send(`param is ${req.params.id}`)
});

const createBlog = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.description) {
        res.status(400)
        throw new Error('Please add all fields')
      }
    
      const blog = await Blog.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user.id,
      })
    
      res.status(200).json(blog)
});

export const blogController = {
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog,
    createBlog,
};

