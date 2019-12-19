// curl -i -H "Accept: application/json" -H "Content-Type: application/json" http://localhost:3000/user/<id>

import * as Joi from '@hapi/joi';

import model from '../../model';

type Params = {
    id: string;
};

const schema = Joi.object({
    id: Joi.string().required()
});

export const get = async (req, res) => {
    const { id }: Params = await schema.validateAsync(req.params);
    const user = await model.getUser(id);

    res.send(user);
};
