import loggers from '#loggers';
import groupService from '#services/group';

import * as T from './types';
import validator from './validator';

const handle = async (req, res) => {
    const { name, permissions }: T.Body = req.body;
    const groupId = await groupService.create({ name, permissions });

    res.send({ groupId });
};

export const create = [
    validator,
    handle
];
