import userService from '#services/user';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    const body: T.Body = req.body;
    const { id, age, login, password } = body;

    try {
        const userUpdated = await userService.update({
            id,
            age,
            login,
            password
        });

        res.send(userUpdated);
    } catch (error) {
        return next(error);
    }
};

export const update = [
    validator,
    handle
];
