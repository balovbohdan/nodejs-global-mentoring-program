import * as express from 'express';

import { config } from '#config';

import setHandlers from './set-handlers';

export const startServer = () => {
    const app = express();

    setHandlers(app);
    app.listen(process.env.SERVER_PORT);
};
