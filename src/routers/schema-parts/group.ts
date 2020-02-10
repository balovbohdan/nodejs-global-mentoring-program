import * as Joi from '@hapi/joi';

import { constants } from '#models/group';

import commonSchemaParts from './common';

const schemaParts = {
    id: commonSchemaParts.id,
    name: () => Joi.string().min(4).max(20),
    permissions: () => Joi.array().items(...Object.values(constants.PERMISSIONS))
};

export default schemaParts;
