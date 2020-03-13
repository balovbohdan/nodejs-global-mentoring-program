import * as express from 'express';

const setSystemHandlers = (app: express.Express) => {
    app.use(express.json());
};

export default setSystemHandlers;
