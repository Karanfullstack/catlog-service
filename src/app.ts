import express from 'express';
import { globalErrorHandler } from './middleware/globalError';
import 'reflect-metadata';
import config from 'config';

const app = express();

app.get('/', async (req, res) => {
    res.send({ message: config.get('server.port') });
});

app.use(globalErrorHandler);

export default app;
