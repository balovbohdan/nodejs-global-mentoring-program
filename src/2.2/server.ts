import * as express from 'express';

import * as routes from './routes';

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
    if (err) {
        res.status(500).end();
    } else {
        return next();
    }
});

app.get('/user/:id', routes.user.get);
app.put('/user', routes.user.create);
app.post('/user', routes.user.update);
app.delete('/user/:id', routes.user.del);

app.post('/auto-suggested-users', routes.users.getAutoSuggested);

app.listen(3000);
