import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import schemaParts from '../../schema-parts/user';

const schema = Joi.object({
    age: schemaParts.age().required(),
    login: schemaParts.login().required(),
    password: schemaParts.password().required()
});

const validator = createValidator();
const bodyValidator = validator.body(schema);

export default bodyValidator;
