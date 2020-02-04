import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import schemaParts from '../../schema-parts/group';

const schema = Joi.object({
    id: schemaParts.id().required()
});

const validator = createValidator();
const paramsValidator = validator.params(schema);

export default paramsValidator;
