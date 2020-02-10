import { Express } from 'express';

import setSystemHandlers from './set-system-handlers';
import setEndpointHandlers from './set-endpoint-handlers';

const setHandlers = (app: Express) => {
    setSystemHandlers(app);
    setEndpointHandlers(app);
};

export default setHandlers;
