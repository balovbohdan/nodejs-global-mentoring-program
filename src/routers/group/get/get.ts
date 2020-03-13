import groupService from '#services/group';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    const { id }: T.Params = req.params;

    try {
        const group = await groupService.get({
            where: { id }
        });

        res.send(group);
    } catch (error) {
        return next(error);
    }
};

export const get = [
    validator,
    handle
];
