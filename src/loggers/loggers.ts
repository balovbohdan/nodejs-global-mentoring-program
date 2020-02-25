import * as bunyan from 'bunyan';

export const routerLogger = bunyan.createLogger({
    name: 'routersLogger'
});
