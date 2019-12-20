import * as Joi from '@hapi/joi';

import model from '../../model';

type Body = {
    limit: number;
    loginSubstring?: string;
};

const schema = Joi.object({
    limit: Joi.number().required(),
    loginSubstring: Joi.string()
});

export const getAutoSuggested = async (req, res) => {
    const { limit, loginSubstring }: Body = await schema.validateAsync(req.body);
    const users = await model.getAutoSuggestedUsers({ limit, loginSubstring });

    res.send(users);
};
