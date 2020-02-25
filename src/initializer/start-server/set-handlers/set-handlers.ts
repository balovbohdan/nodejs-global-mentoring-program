import { Express } from 'express';

import setLogger from './set-logger';
import setSystemHandlers from './set-system-handlers';
import setEndpointHandlers from './set-endpoint-handlers';

const setHandlers = (app: Express) => {
    setLogger(app);
    setSystemHandlers(app);
    setEndpointHandlers(app);
};

export default setHandlers;
