import * as Joi from '@hapi/joi';

const schema = Joi.object({
    id: Joi.string().required()
});

export const get = async (req, res) => {
    const params = await schema.validateAsync(req.params);

    res.send(params);
};
