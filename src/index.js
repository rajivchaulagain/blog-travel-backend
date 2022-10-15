import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import blogRoutes from './routes/blogRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorMiddleWare.js';
import { connectDB } from './database/db.js';
import path from 'path';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/' , express.static('public'));

//serve static assests if production

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
    app.get('*' , (req , res) => {
        res.sendFile(path.resolve(__dirname , 'client' , 'build' , 'index.html'));
    });
}

app.use(cors());

app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    console.log(`this is home page`);
});

app.use('/api/blogs', publicRoutes);

app.use('/api/user/blogs', blogRoutes)

app.use('/api/users', userRoutes);

app.use(errorHandler)

app.listen(port, () => {
    console.log(`port is running on port ${port}`);
});