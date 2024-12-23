import 'reflect-metadata';
import express from 'express';
import { globalErrorHandler } from './middlewares/globalError';
import { categoryRouter } from './category/category.routes';
import cookieParser from 'cookie-parser';
import { productRouter } from './product/product.routes';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use(globalErrorHandler);

export default app;
