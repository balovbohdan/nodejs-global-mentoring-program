import * as express from 'express';

import loggers from '#loggers';

const setSystemHandlers = (app: express.Express) => {
    app.use(express.json());

    app.use((error, req, res, next) => {
        if (error) {
            loggers.routersLogger.error({
                method: 'usersService.getAutoSuggested',
                message: error.message,
                args: { }
            });

            res.status(500).end();
        } else {
            return next();
        }
    });
};

export default setSystemHandlers;
