import config from 'config';
import app from './app';
import logger from './config/logger';
import { connection } from './connection';

const startServer = async () => {
    const PORT: number = config.get('server.port') || 5502;
    try {
        await connection();
        app.listen(PORT, () => {
            logger.info(`Server is running at http://localhost:${PORT})}`);
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error(error.message);
            logger.on('finish', () => {
                process.exit(1);
            });
        }
    }
};

void startServer();
