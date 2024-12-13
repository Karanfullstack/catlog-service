import 'reflect-metadata';
import express from 'express';
import { globalErrorHandler } from './middleware/globalError';
import { categoryRouter } from './category/category.routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/categoryies', categoryRouter);
app.use(globalErrorHandler);

export default app;
