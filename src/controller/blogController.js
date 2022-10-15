
import asyncHandler from 'express-async-handler';
import { Blog } from '../models/blogModel.js';

//private bogs

const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({ user: req.user._id })
    res.json(blogs)
});

const getBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.json(blog)
});

const updateBlog = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.description || req.file.filename || req.body.category) {
        res.status(500);
        throw new Error('Please add all fields')
    }
    const blog = await Blog.updateOne({
        title: req.body.title,
        description: req.body.description,
        user: req.user.id,
        category: req.body.category,
        coverImage: req.file.filename
    })
    res.status(200).json(blog)
});

const deleteBlog = asyncHandler(async (req, res) => {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(201).json("blog deleted successfully")
});

const createBlog = asyncHandler(async (req, res) => {
    console.log(req.body, req.file);
    if (!req.body.title || !req.body.description || !req.file || !req.body.category) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    try {
        const blog = await Blog.create({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            user: req.user.id,
            coverImage: req.file.filename
        })
        res.status(200).json(blog)
    }
    catch (err) {
        res.status(500).json(`${err}`)
    }

});

export const blogController = {
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog,
    createBlog,
};

