import { Express } from 'express';

import setErrorHandlers from './set-error-handlers';
import setSystemHandlers from './set-system-handlers';
import setEndpointHandlers from './set-endpoint-handlers';

const setHandlers = (app: Express) => {
    setSystemHandlers(app);
    setEndpointHandlers(app);
    setErrorHandlers(app);
};

export default setHandlers;
