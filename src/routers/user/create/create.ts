import userActions from '#model/actions/user';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    try {
        const { age, login, password }: T.Body = req.body;
        const userId = await userActions.create({ age, login, password });

        res.send({ userId });
    } catch (error) {
        return next(error);
    }
};

export const create = [
    validator,
    handle
];
