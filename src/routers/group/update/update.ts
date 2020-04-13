import groupService from '#services/group';
import * as middlewares from '#routers/middlewares';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    const { id, name, permissions }: T.Body = req.body;

    try {
        const groupUpdated = await groupService.update({ id, name, permissions });

        res.send(groupUpdated);
    } catch (error) {
        return next(error);
    }
};

export const update = [
    middlewares.auth,
    validator,
    handle
];
