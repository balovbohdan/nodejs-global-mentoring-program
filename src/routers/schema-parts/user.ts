import * as Joi from '@hapi/joi';

import commonSchemaParts from './common';

const schemaParts = {
    id: commonSchemaParts.id,
    login: () => Joi.string().email(),
    age: () => Joi.number().integer().min(4).max(130),
    password: () => (
        Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/, 'password')
    )
};

export default schemaParts;
