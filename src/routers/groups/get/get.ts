import groupsActions from '#model/actions/groups';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    try {
        const { limit }: T.Body = req.body;
        const groups = await groupsActions.get({ limit });

        res.send(groups);
    } catch (error) {
        return next(error);
    }
};

export const get = [
    validator,
    handle
];
