import * as Joi from '@hapi/joi';

import model from '../../model';
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

export const create = async (req, res, next) => {
    try {
        const { age, login, password }: Body = await schema.validateAsync(req.body);
        const userId = await model.createUser({ age, login, password });

        res.send({ userId });
    } catch (error) {
        return next(error);
    }
};
