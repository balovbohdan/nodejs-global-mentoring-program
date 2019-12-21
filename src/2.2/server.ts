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
app.post('/create-user', routes.user.create);
app.post('/update-user', routes.user.update);
app.delete('/delete-user/:id', routes.user.del);

app.post('/auto-suggested-users', routes.users.getAutoSuggested);

app.listen(3000);
