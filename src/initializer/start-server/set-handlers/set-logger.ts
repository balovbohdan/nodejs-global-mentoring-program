import { isEmpty } from 'ramda';
import * as morgan from 'morgan';
import { Express } from 'express';

const logPayload = (payloadName, payload) => {
    if (isEmpty(payload)) {
        return '';
    }

    const log = Object.entries(payload)
        .map(([name, value]) => `${name}: ${value}`)
        .join(', ');

    return `${payloadName}: { ${log} }`;
};

const setLogger = (app: Express) => {
    const logger = morgan((tokens, req, res) => {
        const items = [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            logPayload('QUERY', req.query),
            logPayload('PARAMS', req.params),
            logPayload('BODY', req.body)
        ];

        return items.filter(Boolean).join(' | ');
    });

    app.use(logger);
};

export default setLogger;
