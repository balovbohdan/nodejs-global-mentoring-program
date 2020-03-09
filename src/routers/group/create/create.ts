import loggers from '#loggers';
import groupService from '#services/group';
import * as middlewares from '#routers/middlewares';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    const { name, permissions }: T.Body = req.body;

    try {
        const groupId = await groupService.create({ name, permissions });

        res.send({ groupId });
    } catch (error) {
        loggers.routersLogger.error({
            method: groupService.create,
            message: error.message,
            args: { name, permissions }
        });

        return next(error);
    }
};

export const create = [
    middlewares.auth,
    validator,
    handle
];
