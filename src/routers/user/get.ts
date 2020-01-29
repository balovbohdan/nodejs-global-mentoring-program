import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import * as actions from '../../model/actions';
import * as schemaParts from '../schema-parts';

type Params = {
    id: string;
};

const schema = Joi.object({
    id: schemaParts.id().required()
});

const validator = createValidator();

const handle = async (req, res, next) => {
    try {
        const { id }: Params = req.params;
        const user = await actions.user.get(id);

        res.send(user);
    } catch (error) {
        return next(error);
    }
};

export const get = [
    validator.params(schema),
    handle
];
