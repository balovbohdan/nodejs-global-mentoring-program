import loggers from '#loggers';
import userGroupService from '#services/user-group';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    const { group, userIds }: T.Body = req.body;

    try {
        await userGroupService.addUsers({ group, userIds });

        res.end();
    } catch (error) {
        loggers.routersLogger.error({
            method: 'userGroupService.addUsers',
            message: error.message,
            args: { group, userIds }
        });

        return next(error);
    }
};

export const addUsers = [
    validator,
    handle
];
