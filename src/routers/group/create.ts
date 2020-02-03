import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import schemaParts from '../schema-parts/group';
import { T } from '../../model/data-access/group';
import groupActions from '../../model/actions/group';

type Body = {
    name: string;
    permissions: T.Permission[];
};

const schema = Joi.object({
    name: schemaParts.name().required(),
    permissions: schemaParts.permissions().required()
});

const validator = createValidator();

const handle = async (req, res, next) => {
    try {
        const { name, permissions }: Body = req.body;
        const groupId = await groupActions.create({ name, permissions });

        res.send({ groupId });
    } catch (error) {
        return next(error);
    }
};

export const create = [
    validator.body(schema),
    handle
];
