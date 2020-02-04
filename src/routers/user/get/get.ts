import userActions from '#model/actions/user';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    try {
        const { id }: T.Params = req.params;
        const user = await userActions.get(id);

        res.send(user);
    } catch (error) {
        return next(error);
    }
};

export const get = [
    validator,
    handle
];
