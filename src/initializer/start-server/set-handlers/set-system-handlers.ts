import * as express from 'express';

const setSystemHandlers = (app: express.Express) => {
    app.use(express.json());

    app.use((err, req, res, next) => {
        if (err) {
            res.status(500).end();
        } else {
            return next();
        }
    });
};

export default setSystemHandlers;
