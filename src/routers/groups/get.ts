import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import groupsActions from '#model/actions/groups';

type Body = {
    limit?: number;
};

const schema = Joi.object({
    limit: Joi.number().integer()
});

const validator = createValidator();

const handle = async (req, res, next) => {
    try {
        const { limit }: Body = req.body;
        const groups = await groupsActions.get({ limit });

        res.send(groups);
    } catch (error) {
        return next(error);
    }
};

export const get = [
    validator.body(schema),
    handle
];
