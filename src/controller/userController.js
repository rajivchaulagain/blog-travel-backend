
import asyncHandler from 'express-async-handler';
import bcryt from 'bcryptjs';

import { User } from '../models/userModel.js';
import { generateToken } from '../utils/utils.js';

const getUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user._id);
    res.status(200).json({
        id: _id,
        name,
        email
    })
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })
    console.log(user);
    if (user && (await bcryt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
});

const register = asyncHandler(async (req, res) => {
    const { name, email, password ,  } = req.body;
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    //check if user exists by email
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    //hash password
    const salt = await bcryt.genSalt(10)
    const hashedPassword = await bcryt.hash(password, salt)

    //create user
    const user = await User.create({
        name, email, password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid user data")
    }
});

export const userController = {
    login, register, getUser
};

