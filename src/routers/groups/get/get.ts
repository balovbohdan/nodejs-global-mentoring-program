import loggers from '#loggers';
import groupsService from '#services/groups';

import * as T from './types';
import validator from './validator';

const handle = async (req, res) => {
    const { limit }: T.Body = req.body;
    const groups = await groupsService.get({ limit });

    res.send(groups);
};

export const get = [
    validator,
    handle
];
