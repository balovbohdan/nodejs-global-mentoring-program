import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import model from '../../model';

type Body = {
    limit: number;
    loginSubstring?: string;
};

const schema = Joi.object({
    limit: Joi.number().integer().required(),
    loginSubstring: Joi.string()
});

const validator = createValidator();

const handle = async (req, res, next) => {
    try {
        const { limit, loginSubstring }: Body = req.body;
        const users = await model.users.getAutoSuggested({
            limit,
            loginSubstring
        });

        res.send(users);
    } catch (error) {
        return next(error);
    }
};

export const getAutoSuggested = [
    validator.body(schema),
    handle
];
