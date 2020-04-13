import loggers from '#loggers';
import loginService from '#services/login';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    const { login, password }: T.Params = req.body;

    try {
        const token = await loginService.getToken({ login, password });

        res.send(token);
    } catch (error) {
        loggers.routersLogger.error({
            method: 'loginService.getToken',
            message: error.message,
            args: { login, password }
        });

        return next(error);
    }
};

export const token = [
    validator,
    handle
];
