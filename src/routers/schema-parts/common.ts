import * as Joi from '@hapi/joi';

const schemaParts = {
    id: () => Joi.string().guid({ version: 'uuidv4' })
};

export default schemaParts;
