import 'reflect-metadata';
import express from 'express';
import { globalErrorHandler } from './middlewares/globalError';
import { categoryRouter } from './category/category.routes';
import cookieParser from 'cookie-parser';
import { productRouter } from './product/product.routes';
import cors from 'cors';
import path from 'path';
import toppingRouter from './topping/topping.routes';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../uploads')));
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/topping', toppingRouter);
app.use(globalErrorHandler);

export default app;
