import config from 'config';
import mongoose from 'mongoose';
import logger from '../config/logger';

export const connection = async () => {
    try {
        const connection = await mongoose.connect(config.get('database.url'));
        logger.info('Database connected', config.get('database.url'));
        return connection;
    } catch (error) {
        logger.error('Error connecting to the database: ', (error as Error).message);
        process.exit(1);
    }
};
