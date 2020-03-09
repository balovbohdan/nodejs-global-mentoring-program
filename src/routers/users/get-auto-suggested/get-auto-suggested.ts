import loggers from '#loggers';
import usersService from '#services/users';
import * as middlewares from '#routers/middlewares';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    const { limit, loginSubstring }: T.Body = req.body;

    try {
        const users = await usersService.getAutoSuggested({
            limit,
            loginSubstring
        });

        res.send(users);
    } catch (error) {
        loggers.routersLogger.error({
            method: 'usersService.getAutoSuggested',
            message: error.message,
            args: { limit, loginSubstring }
        });

        return next(error);
    }
};

export const getAutoSuggested = [
    middlewares.auth,
    validator,
    handle
];
