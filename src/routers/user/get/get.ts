import loggers from '#loggers';
import userService from '#services/user';

import * as T from './types';
import validator from './validator';

const handle = async (req, res) => {
    const { id }: T.Params = req.params;
    const user = await userService.get(id);

    res.send(user);
};

export const get = [
    validator,
    handle
];
