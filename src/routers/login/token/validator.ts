import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import schemaParts from '#routers/schema-parts/user';

const schema = Joi.object({
    login: schemaParts.login().required(),
    password: schemaParts.password().required()
});

const validator = createValidator();
const bodyValidator = validator.body(schema);

export default bodyValidator;
