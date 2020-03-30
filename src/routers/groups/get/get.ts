import groupsService from '#services/groups';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    const { limit }: T.Body = req.body;

    try {
        const groups = await groupsService.get({ limit });

        res.send(groups);
    } catch (error) {
        return next(error);
    }
};

export const get = [
    validator,
    handle
];
