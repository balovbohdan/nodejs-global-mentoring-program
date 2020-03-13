import loggers from '#loggers';
import groupService from '#services/group';

import * as T from './types';
import validator from './validator';

const handle = async (req, res) => {
    const { id }: T.Params = req.params;

    await groupService.del(id);

    res.end();
};

export const del = [
    validator,
    handle
];
