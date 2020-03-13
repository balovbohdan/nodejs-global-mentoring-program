import * as express from 'express'
import * as responseTime from 'response-time';

const setSystemHandlers = (app: express.Express) => {
    app.use(responseTime((req, res, time) => {
        console.log(`Req "${req.url}" took "${time}" milliseconds.`);
    }));

    app.use(express.json());
};

export default setSystemHandlers;
