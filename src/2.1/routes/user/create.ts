// curl -i -H "Accept: application/json" -H "Content-Type: application/json" --data '{"age":10,"login":"login","password":"password"}' http://localhost:3000/create-user

import * as Joi from '@hapi/joi';

import model from '../../model';

type Body = {
    age: number;
    login: string;
    password: string;
};

const schema = Joi.object({
    age: Joi.number().required(),
    login: Joi.string().required(),
    password: Joi.string().required()
});

export const create = async (req, res) => {
    const { age, login, password }: Body = await schema.validateAsync(req.body);
    const userId = await model.createUser({ age, login, password });

    res.send({ userId });
};
