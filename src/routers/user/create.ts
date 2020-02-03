import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import schemaParts from '../schema-parts/user';
import userActions from '../../model/actions/user';

type Body = {
    age: number;
    login: string;
    password: string;
};

const schema = Joi.object({
    age: schemaParts.age().required(),
    login: schemaParts.login().required(),
    password: schemaParts.password().required()
});

const validator = createValidator();

const handle = async (req, res, next) => {
    try {
        const { age, login, password }: Body = req.body;
        const userId = await userActions.create({ age, login, password });

        res.send({ userId });
    } catch (error) {
        return next(error);
    }
};

export const create = [
    validator.body(schema),
    handle
];
