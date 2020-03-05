import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import schemaParts from '#routers/schema-parts/user';

const schema = Joi.object({
    id: schemaParts.id().required()
});

const validator = createValidator();
const paramsValidator = validator.params(schema);

export default paramsValidator;
