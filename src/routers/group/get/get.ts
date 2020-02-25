import loggers from '#loggers';
import groupService from '#services/group';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    try {
        const { id }: T.Params = req.params;
        const group = await groupService.get({
            where: { id }
        });

        res.send(group);
    } catch (error) {
        loggers.routersLogger.error(error.message);

        return next(error);
    }
};

export const get = [
    validator,
    handle
];
