import * as cors from 'cors';
import * as express from 'express'
import * as responseTime from 'response-time';

import loggers from '#loggers';

const setSystemHandlers = (app: express.Express) => {
    app.use(responseTime((req, res, time) => {
        loggers.consoleLogger.info(`Req '${req.url}' took '${time}' milliseconds.`);
    }));

    app.use(cors());
    app.use(express.json());
};

export default setSystemHandlers;
