import loggers from '#loggers';
import groupService from '#services/group';

import * as T from './types';
import validator from './validator';

const handle = async (req, res) => {
    const { id }: T.Params = req.params;
    const group = await groupService.get({
        where: { id }
    });

    res.send(group);
};

export const get = [
    validator,
    handle
];
