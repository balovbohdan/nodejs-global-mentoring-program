import groupActions from '#model/actions/group';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    try {
        const { id }: T.Params = req.params;
        const group = await groupActions.get(id);

        res.send(group);
    } catch (error) {
        return next(error);
    }
};

export const get = [
    validator,
    handle
];
