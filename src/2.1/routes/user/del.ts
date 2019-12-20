import * as Joi from '@hapi/joi';

import model from '../../model';

type Params = {
    id: string;
};

const schema = Joi.object({
    id: Joi.string().required()
});

export const del = async (req, res, next) => {
    try {
        const { id }: Params = await schema.validateAsync(req.params);

        await model.deleteUser(id);

        res.end();
    } catch (error) {
        return next(error);
    }
};
