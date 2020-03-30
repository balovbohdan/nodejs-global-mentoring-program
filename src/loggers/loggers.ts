import * as winston from 'winston';

import { config } from '#config';

export const dbLogger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { name: 'dbLogger' },
    transports: [
        new winston.transports.Console()
    ]
});

export const consoleLogger = winston.createLogger({
    defaultMeta: { name: 'consoleLogger' },
    transports: [
        new winston.transports.Console()
    ]
});

export const routersLogger = winston.createLogger({
    defaultMeta: { name: 'routersLogger' },
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: config.logs.path })
    ]
});

export const globalErrorsLogger = winston.createLogger({
    defaultMeta: { name: 'globalErrorsLogger' },
    transports: [
        new winston.transports.Console()
    ]
});
