import loggers from '#loggers';
import groupService from '#services/group';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    const { id }: T.Params = req.params;

    try {
        await groupService.del(id);

        res.end();
    } catch (error) {
        loggers.routersLogger.error({
            method: 'groupService.del',
            message: error.message,
            args: { id }
        });

        return next(error);
    }
};

export const del = [
    validator,
    handle
];
