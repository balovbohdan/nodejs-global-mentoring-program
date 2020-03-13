import userService from '#services/user';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    const { id }: T.Params = req.params;

    try {
        const user = await userService.get(id);

        res.send(user);
    } catch (error) {
        return next(error);
    }
};

export const get = [
    validator,
    handle
];
