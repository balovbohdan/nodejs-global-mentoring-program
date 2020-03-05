import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const schema = Joi.object({
    group: Joi.string().required(),
    userIds: Joi.array().items(Joi.string()).required()
});

const validator = createValidator();
const bodyValidator = validator.body(schema);

export default bodyValidator;
