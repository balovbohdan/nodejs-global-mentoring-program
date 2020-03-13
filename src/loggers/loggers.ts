import * as bunyan from 'bunyan';

import { config } from '#config';

export const dbLogger = bunyan.createLogger({
    name: 'dbLogger'
});

export const consoleLogger = bunyan.createLogger({
    name: 'consoleLogger'
});

export const routersLogger = bunyan.createLogger({
    name: 'routersLogger',
    streams: [{
        path: config.logs.path
    }]
});

export const globalErrorsLogger = bunyan.createLogger({
    name: 'globalErrorsLogger'
});
