import groupService from '#services/group';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    try {
        const { id }: T.Params = req.params;

        await groupService.del(id);

        res.end();
    } catch (error) {
        return next(error);
    }
};

export const del = [
    validator,
    handle
];
