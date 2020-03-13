import loggers from '#loggers';
import userGroupService from '#services/user-group';

import * as T from './types';
import validator from './validator';

const handle = async (req, res) => {
    const { group, userIds }: T.Body = req.body;

    await userGroupService.addUsers({ group, userIds });

    res.end();
};

export const addUsers = [
    validator,
    handle
];
