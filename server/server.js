import cookieParser from 'cookie-parser';

import express from 'express';
import connectDB from './configs/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import serllerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import connectCloudinary from './configs/cloudinary.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
//connect to database
await connectDB();
await connectCloudinary();


//allow multiple origins
const allowedOrigins = ['http://localhost:5173']; // replace with your frontend domains

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: allowedOrigins, credentials: true}));



app.get('/', (req, res) => {
    res.send('API is working'); 
});

app.use('/api/user', userRouter);
app.use('/api/seller', serllerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);


app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
});