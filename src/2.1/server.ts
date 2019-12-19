import * as express from 'express';

import * as routes from './routes';

const app = express();

app.use(express.json());

app.get('/user/:id', routes.user.get);

app.listen(3000);
