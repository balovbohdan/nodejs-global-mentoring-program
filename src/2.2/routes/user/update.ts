import * as Joi from '@hapi/joi';

import model from '../../model';
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

export const update = async (req, res, next) => {
    try {
        const body: Body = await schema.validateAsync(req.body);
        const { id, age, login, password } = body;
        const userUpdated = await model.updateUser({
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
