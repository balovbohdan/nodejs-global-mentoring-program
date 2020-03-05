import { Transaction } from 'sequelize';

import { UserGroup } from '#models';

import * as T from './types';
import groupService from '../group';

export const del = async (input: T.DeleteUserGroupInput, transaction?: Transaction): Promise<void> => {
    const where = input.where as any;

    await UserGroup.destroy({
        where,
        transaction
    });
};

export const addUsers = async (input: T.AddUsersInput): Promise<void> => {
    const group = await groupService.get({
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
