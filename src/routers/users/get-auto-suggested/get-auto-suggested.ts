import loggers from '#loggers';
import usersService from '#services/users';

import * as T from './types';
import validator from './validator';

const handle = async (req, res) => {
    const { limit, loginSubstring }: T.Body = req.body;
    const users = await usersService.getAutoSuggested({
        limit,
        loginSubstring
    });

    res.send(users);
};

export const getAutoSuggested = [
    validator,
    handle
];
