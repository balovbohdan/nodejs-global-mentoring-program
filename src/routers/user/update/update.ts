import loggers from '#loggers';
import userService from '#services/user';

import * as T from './types';
import validator from './validator';

const handle = async (req, res) => {
    const body: T.Body = req.body;
    const { id, age, login, password } = body;
    const userUpdated = await userService.update({
        id,
        age,
        login,
        password
    });

    res.send(userUpdated);
};

export const update = [
    validator,
    handle
];
