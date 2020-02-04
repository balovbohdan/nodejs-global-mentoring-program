import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import schemaParts from '#routers/schema-parts/group';

const schema = Joi.object({
    id: schemaParts.id().required(),
    name: schemaParts.name(),
    permissions: schemaParts.permissions()
});

const validator = createValidator();
const bodyValidator = validator.body(schema);

export default bodyValidator;
