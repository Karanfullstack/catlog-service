import 'reflect-metadata';
import express from 'express';
import { globalErrorHandler } from './middlewares/globalError';
import { categoryRouter } from './category/category.routes';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/categoryies', categoryRouter);
app.use(globalErrorHandler);

export default app;
