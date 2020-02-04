import { Transaction } from 'sequelize';

import { UserGroup } from '#model/data-access';
import * as dataAccessUtils from '#model/data-access/utils';

import * as T from './types';
import groupActions from '../group';

export const del = async (input: T.DeleteUserGroupInput, transaction?: Transaction): Promise<void> => {
    const where = input.where as any;

    await UserGroup.destroy({
        where,
        transaction
    });
};

export const addUsers = async (input: T.AddUsersInput): Promise<void> => {
    const group = await groupActions.get({
        where: {
            name: input.group
        }
    });

    if (!group) {
        throw new Error(`Failed to find group "${input.group}".`);
    }

    const records = input.userIds.map(userId => ({
        userId,
        groupId: group.id
    }));

    await UserGroup.bulkCreate(records);
};
