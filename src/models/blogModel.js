import mongoose from 'mongoose';

const blogSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please add a title value']
        },
        description: {
            type: String,
            required: [true, 'Please add a description']
        },
    },
    {
        timestamps: true,
    }
);

export const Blog = mongoose.model('Blog', blogSchema)