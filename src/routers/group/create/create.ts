import groupActions from '#model/actions/group';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    try {
        const { name, permissions }: T.Body = req.body;
        const groupId = await groupActions.create({ name, permissions });

        res.send({ groupId });
    } catch (error) {
        return next(error);
    }
};

export const create = [
    validator,
    handle
];
