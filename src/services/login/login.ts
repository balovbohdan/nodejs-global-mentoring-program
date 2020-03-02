import userService from '#services/user';

import * as T from './types';

export const getToken = async ({ login, password }: T.GetTokenInput) => {
    await userService.verify({ login, password });
    
};
