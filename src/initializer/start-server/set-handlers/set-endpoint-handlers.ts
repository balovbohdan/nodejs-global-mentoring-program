import { Express } from 'express';

import * as routers from '#routers';

const setUserHandlers = (app: Express) => {
    app
        .get('/user/:id', routers.user.get)
        .put('/user', routers.user.create)
        .post('/user', routers.user.update)
        .delete('/user/:id', routers.user.del);
};

const setUsersHandlers = (app: Express) => {
    app.post('/auto-suggested-users', routers.users.getAutoSuggested);
};

const setGroupHandlers = (app: Express) => {
    app
        .get('/group/:id', routers.group.get)
        .put('/group', routers.group.create)
        .post('/group', routers.group.update)
        .delete('/group/:id', routers.group.del);
};

const setGroupsHandlers = (app: Express) => {
    app.post('/groups', routers.groups.get);
};

const setUserGroupHandlers = (app: Express) => {
    app.put('/user-group/add-users', routers.userGroup.addUsers);
};

const setLoginHandlers = (app: Express) => {
    app.post('/token', routers.login.token);
};

const setEndpointHandlers = (app: Express) => {
    setUserHandlers(app);
    setUsersHandlers(app);
    setGroupHandlers(app);
    setGroupsHandlers(app);
    setUserGroupHandlers(app);
    setLoginHandlers(app);
};

export default setEndpointHandlers;
