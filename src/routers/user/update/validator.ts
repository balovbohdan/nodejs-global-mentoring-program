import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import schemaParts from '#routers/schema-parts/user';

const schema = Joi.object({
    age: schemaParts.age(),
    login: schemaParts.login(),
    id: schemaParts.id().required(),
    password: schemaParts.password()
});

const validator = createValidator();
const bodyValidator = validator.body(schema);

export default bodyValidator;
