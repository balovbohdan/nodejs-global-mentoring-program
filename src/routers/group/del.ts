import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import schemaParts from '../schema-parts/group';
import groupActions from '../../model/actions/group';

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

        await groupActions.del(id);

        res.end();
    } catch (error) {
        return next(error);
    }
};

export const del = [
    validator.params(schema),
    handle
];