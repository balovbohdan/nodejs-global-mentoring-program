import * as Joi from '@hapi/joi';

import model from '../../model';
import * as schemaParts from '../schema-parts';

type Params = {
    id: string;
};

const schema = Joi.object({
    id: schemaParts.id().required()
});

export const get = async (req, res, next) => {
    try {
        const { id }: Params = await schema.validateAsync(req.params);
        const user = await model.getUser(id);

        res.send(user);
    } catch (error) {
        return next(error);
    }
};
