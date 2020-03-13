import * as express from 'express';

import loggers from '#loggers';

const log = ({ url, body, query, params }) => {
    [body, query, params].map((payload) => {
        const payloadSerialized = Object.entries(payload)
            .map(([name, value]) => `${name}: ${value}`)
            .join(', ');

        if (payloadSerialized) {
            console.log(`Error on "${url}" happened. Payload: { ${payloadSerialized} }`);
        }
    });
};

const setErrorHandlers = (app: express.Express) => {
    app.use((err, req, res, next) => {
        if (err) {
            log(req);
            res.status(500).end();
        } else {
            return next();
        }
    });
};

export default setErrorHandlers;
