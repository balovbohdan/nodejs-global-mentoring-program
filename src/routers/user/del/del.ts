import loggers from '#loggers';
import userService from '#services/user';
import * as middlewares from '#routers/middlewares';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    const { id }: T.Params = req.params;

    try {
        await userService.del(id);

        res.end();
    } catch (error) {
        loggers.routersLogger.error({
            method: 'userService.del',
            message: error.message,
            args: { id }
        });

        return next(error);
    }
};

export const del = [
    middlewares.auth,
    validator,
    handle
];
