import * as express from 'express';

import setHandlers from './set-handlers';

const startServer = () => {
    const app = express();

    setHandlers(app);
    app.listen(3000);
};

export default startServer;
