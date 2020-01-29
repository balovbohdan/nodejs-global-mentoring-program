import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import * as actions from '../../model/actions';
import * as schemaParts from '../schema-parts';

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
        const userId = await actions.user.create({ age, login, password });

        res.send({ userId });
    } catch (error) {
        return next(error);
    }
};

export const create = [
    validator.body(schema),
    handle
];
