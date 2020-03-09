import * as jwt from 'jwt-simple';

import { config } from '#config';
import userService from '#services/user';

import * as T from './types';

export const getToken = async ({ login, password }: T.GetTokenInput) => {
    const { id } = await userService.verify({ login, password });
    const payload = {
        user: { id },
        exp: Date.now() + config.auth.tokenLifespan
    };

    return jwt.encode(payload, config.auth.secret, config.auth.algorithm);
};
