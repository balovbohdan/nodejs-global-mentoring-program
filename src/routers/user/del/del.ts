import loggers from '#loggers';
import userService from '#services/user';

import * as T from './types';
import validator from './validator';

const handle = async (req, res) => {
    const { id }: T.Params = req.params;

    await userService.del(id);

    res.end();
};

export const del = [
    validator,
    handle
];
