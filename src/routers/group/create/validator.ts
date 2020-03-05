import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import schemaParts from '#routers/schema-parts/group';

const schema = Joi.object({
    name: schemaParts.name().required(),
    permissions: schemaParts.permissions().required()
});

const validator = createValidator();
const bodyValidator = validator.body(schema);

export default bodyValidator;
