import loggers from '#loggers';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    const { login, password }: T.Params = req.params;

    try {

    } catch (error) {
        loggers.routersLogger.error({
            method: 'loginService.get',
            message: error.message,
            args: { login, password }
        });

        return next(error);
    }
};

export const get = [
    validator,
    handle
];
