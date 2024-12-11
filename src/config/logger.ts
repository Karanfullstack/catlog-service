import winston from 'winston';
import { Config } from './_index';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.colorize()),
    defaultMeta: { service: 'Catalog-Service' },

    transports: [
        new winston.transports.File({
            dirname: 'logs',
            filename: 'app.log',
            level: 'info',
            silent: Config.NODE_ENV === 'test',
        }),
        new winston.transports.File({
            dirname: 'logs',
            filename: 'error.log',
            level: 'error',
            silent: Config.NODE_ENV === 'test',
        }),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            silent: Config.NODE_ENV === 'test',
        }),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(), // Enables colors
                winston.format.simple(), // Simplified log format
            ),
            silent: Config.NODE_ENV === 'test',
        }),
    ],
});

export default logger;
