import * as cors from 'cors';
import * as express from 'express'

import * as middlewares from '#routers/middlewares';

const setSystemHandlers = (app: express.Express) => {
    app.use(middlewares.responseTimeLogger);
    app.use(cors());
    app.use(express.json());
};

export default setSystemHandlers;
