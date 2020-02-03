import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import { T } from '#model/data-access/group';
import groupActions from '#model/actions/group';

import schemaParts from '../schema-parts/group';

type Body = {
    id: string;
    name?: string;
    permissions?: T.Permission[];
};

const schema = Joi.object({
    id: schemaParts.id().required(),
    name: schemaParts.name(),
    permissions: schemaParts.permissions()
});

const validator = createValidator();

const handle = async (req, res, next) => {
    try {
        const { id, name, permissions }: Body = req.body;
        const groupUpdated = await groupActions.update({ id, name, permissions });

        res.send(groupUpdated);
    } catch (error) {
        return next(error);
    }
};

export const update = [
    validator.body(schema),
    handle
];
