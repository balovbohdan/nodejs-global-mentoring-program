import { omit } from 'ramda';

import { Group } from '#model/data-access';

import * as T from './types';

const checkExists = async (id: string): Promise<boolean> => {
    const count = await Group.count({
        where: { id }
    });

    return count > 0;
};

export const get = (id: string): Promise<T.Group|null> => (
    Group.findOne({
        where: { id },
        raw: true
    })
);

export const create = async (group: T.CreateGroupInput): Promise<string> => {
    const { id } = await Group.create(group);

    return id;
};

export const del = async (id: string): Promise<void> => {
    const exists = checkExists(id);

    if (exists) {
        await Group.destroy({
            where: { id }
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

    const updatedGroup = await get(group.id);

    console.log('group.id', group.id, updatedGroup);

    if (!updatedGroup) {
        throw new Error('Failed to find updated group.');
    }

    return updatedGroup;
};
