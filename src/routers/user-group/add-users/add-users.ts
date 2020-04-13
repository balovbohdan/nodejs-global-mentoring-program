import userGroupService from '#services/user-group';
import * as middlewares from '#routers/middlewares';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    const { group, userIds }: T.Body = req.body;

    try {
        await userGroupService.addUsers({ group, userIds });

        res.end();
    } catch (error) {
        return next(error);
    }
};

export const addUsers = [
    middlewares.auth,
    validator,
    handle
];
