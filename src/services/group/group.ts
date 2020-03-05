import { omit } from 'ramda';

import { Group } from '#models';
import * as modelsUtils from '#models/utils';
import userGroupService from '#services/user-group';

import * as T from './types';

const checkExists = async (id: string): Promise<boolean> => {
    const count = await Group.count({
        where: { id }
    });

    return count > 0;
};

export const get = (input: T.GetGroupInput): Promise<T.Group|null> => {
    const where = input.where as any;

    return Group.findOne({
        where,
        raw: true
    });
};

export const create = async (group: T.CreateGroupInput): Promise<string> => {
    const { id } = await Group.create(group);

    return id;
};

export const del = async (id: string): Promise<void> => {
    const exists = checkExists(id);

    if (exists) {
        await modelsUtils.createTransaction(async (transaction) => {
            await Group.destroy({
                transaction,
                where: { id }
            });

            await userGroupService.del({
                where: {  groupId: id }
            }, transaction);
        });
    }
};

export const update = async (group: T.UpdateGroupInput): Promise<T.Group> => {
    const exists = checkExists(group.id);
    const dataToUpdate = omit(['id'], group);

    if (!exists) {
        throw new Error(`Failed to update group "${group.id}".`);
    }

    await Group.update(dataToUpdate, {
        where: {
            id: group.id
        }
    });

    const updatedGroup = await get({
        where: {
            id: group.id
        }
    });

    if (!updatedGroup) {
        throw new Error('Failed to find updated group.');
    }

    return updatedGroup;
};
