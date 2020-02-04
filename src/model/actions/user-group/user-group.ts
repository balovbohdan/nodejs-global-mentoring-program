import { Transaction } from 'sequelize';

import { UserGroup } from '#model/data-access';

import * as T from './types';

export const del = async (input: T.DelUserGroupInput, transaction?: Transaction): Promise<void> => {
    const where = input.where as any;

    await UserGroup.destroy({
        where,
        transaction
    });
};
