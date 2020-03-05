import userGroupService from '#services/user-group';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    try {
        const { group, userIds }: T.Body = req.body;

        await userGroupService.addUsers({ group, userIds });

        res.end();
    } catch (error) {
        return next(error);
    }
};

export const addUsers = [
    validator,
    handle
];
