import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import * as actions from '../../model/actions';
import * as schemaParts from '../schema-parts';

type Body = {
    id: string;
    age?: number;
    login?: string;
    password?: string;
};

const schema = Joi.object({
    age: schemaParts.age(),
    login: schemaParts.login(),
    id: schemaParts.id().required(),
    password: schemaParts.password()
});

const validator = createValidator();

const handle = async (req, res, next) => {
    try {
        const body: Body = req.body;
        const { id, age, login, password } = body;
        const userUpdated = await actions.user.update({
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
    validator.body(schema),
    handle
];
