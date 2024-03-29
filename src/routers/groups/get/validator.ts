import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import * as constants from './constants';

const schema = Joi.object({
    limit: Joi.number().integer()
        .min(constants.LIMITS.MIN)
        .max(constants.LIMITS.MAX)
});

const validator = createValidator();
const bodyValidator = validator.body(schema);

export default bodyValidator;
