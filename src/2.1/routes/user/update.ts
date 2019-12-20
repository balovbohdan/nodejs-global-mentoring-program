import * as Joi from '@hapi/joi';

import model from '../../model';

type Body = {
    id: string;
    age?: number;
    login?: string;
    password?: string;
};

const schema = Joi.object({
    id: Joi.string().required(),
    age: Joi.number(),
    login: Joi.string(),
    password: Joi.string()
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
