import * as express from 'express';

import * as routers from './routers';

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
    if (err) {
        res.status(500).end();
    } else {
        return next();
    }
});

app
    .get('/user/:id', routers.user.get)
    .put('/user', routers.user.create)
    .post('/user', routers.user.update)
    .delete('/user/:id', routers.user.del);

app.post('/auto-suggested-users', routers.users.getAutoSuggested);

app
    .get('/group/:id', routers.group.get)
    .put('/group', routers.group.create)
    .post('/group', routers.group.update)
    .delete('/group/:id', routers.group.del);

app.post('/groups', routers.groups.get);

app.listen(3000);
