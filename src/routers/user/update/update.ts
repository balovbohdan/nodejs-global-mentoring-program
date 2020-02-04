import userActions from '#model/actions/user';

import * as T from './types';
import validator from './validator';

const handle = async (req, res, next) => {
    try {
        const body: T.Body = req.body;
        const { id, age, login, password } = body;
        const userUpdated = await userActions.update({
            id,
            age,
            login,
            password
        });

        res.send(userUpdated);
    } catch (error) {
        return next(error);
    }
};

export const update = [
    validator,
    handle
];
