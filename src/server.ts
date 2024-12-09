import config from 'config';
import app from './app';
import logger from './config/logger';

const startServer = () => {
    try {
        const PORT: number = config.get('server.port') || 5502;
        app.listen(PORT, () => {
            logger.info(`Server is running at http://localhost:${PORT})}`);
        });
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error.message);
            setTimeout(() => process.exit(1), 1000);
        }
    }
};

startServer();
