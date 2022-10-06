import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import blogRoutes from './routes/blogRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorMiddleWare.js';
import { connectDB } from './database/db.js';

const env = dotenv.config();

connectDB();
const app = express();

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    console.log(`this is home page`);
});

app.use('/api/blogs', publicRoutes);

app.use('/api/user/blog', blogRoutes)

app.use('/api/users', userRoutes);

app.use(errorHandler)

app.listen(port, () => {
    console.log(`port is running on port ${port}`);
});