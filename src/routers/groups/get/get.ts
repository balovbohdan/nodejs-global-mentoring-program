import loggers from '#loggers';
import groupsService from '#services/groups';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    try {
        const { limit }: T.Body = req.body;
        const groups = await groupsService.get({ limit });

        res.send(groups);
    } catch (error) {
        loggers.routersLogger.error(error.message);

        return next(error);
    }
};

export const get = [
    validator,
    handle
];
