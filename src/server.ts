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

app.get('/user/:id', routers.user.get);
app.put('/user', routers.user.create);
app.post('/user', routers.user.update);
app.delete('/user/:id', routers.user.del);

app.post('/auto-suggested-users', routers.users.getAutoSuggested);

app.listen(3000);
