import express from 'express';
import { globalErrorHandler } from './middleware/globalError';
import 'reflect-metadata';

const app = express();

app.get('/', async (req, res) => {
   res.send('health-check');
});

app.use(globalErrorHandler);

export default app;
