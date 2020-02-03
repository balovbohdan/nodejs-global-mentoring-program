import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const schema = Joi.object({
    limit: Joi.number().integer().required(),
    loginSubstring: Joi.string()
});

const validator = createValidator();
const bodyValidator = validator.body(schema);

export default bodyValidator;
