import loggers from '#loggers';
import groupService from '#services/group';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    try {
        const { name, permissions }: T.Body = req.body;
        const groupId = await groupService.create({ name, permissions });

        res.send({ groupId });
    } catch (error) {
        loggers.routerLogger.error(error.message);

        return next(error);
    }
};

export const create = [
    validator,
    handle
];
