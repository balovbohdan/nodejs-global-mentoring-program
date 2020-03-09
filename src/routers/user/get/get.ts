import loggers from '#loggers';
import userService from '#services/user';
import * as middlewares from '#routers/middlewares';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    const { id }: T.Params = req.params;

    try {
        const user = await userService.get(id);

        res.send(user);
    } catch (error) {
        loggers.routersLogger.error({
            method: 'userService.get',
            message: error.message,
            args: { id }
        });

        return next(error);
    }
};

export const get = [
    middlewares.auth,
    validator,
    handle
];
