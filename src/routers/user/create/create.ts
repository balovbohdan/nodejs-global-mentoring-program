import userService from '#services/user';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    const { age, login, password }: T.Body = req.body;

    try {
        const userId = await userService.create({ age, login, password });

        res.send({ userId });
    } catch (error) {
        return next(error);
    }
};

export const create = [
    validator,
    handle
];
