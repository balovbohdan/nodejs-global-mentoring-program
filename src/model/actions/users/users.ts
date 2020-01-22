import { Op } from 'sequelize';

import * as T from './types';
import { User } from '../../data-access';

export const getAutoSuggested = async ({ limit, loginSubstring }:
    T.AutoSuggestedUsersInput): Promise<T.AutoSuggestedUsers> => {
    const where: any = {
        isDeleted: false
    };

    if (loginSubstring) {
        where.login = {
            [Op.like]: loginSubstring ? `%${loginSubstring}%` : undefined
        };
    }

    const users = await User.findAll({
        where,
        limit,
        raw: true
    });

    return users ? (
        users.map(({ id, age, login }) => ({ id, age, login }))
    ) : [];
};
