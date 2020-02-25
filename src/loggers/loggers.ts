import * as bunyan from 'bunyan';

export const dbLogger = bunyan.createLogger({
    name: 'dbLogger'
});

export const routersLogger = bunyan.createLogger({
    name: 'routersLogger'
});

export const globalErrorsLogger = bunyan.createLogger({
    name: 'globalErrorsLogger'
});
