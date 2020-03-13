import loggers from '#loggers';
import userService from '#services/user';

import * as T from './types';
import validator from './validator';

const handle = async (req, res) => {
    const { age, login, password }: T.Body = req.body;
    const userId = await userService.create({ age, login, password });

    res.send({ userId });
};

export const create = [
    validator,
    handle
];
