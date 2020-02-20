import { User } from '#models';
import * as modelsUtils from '#models/utils';

import * as T from './types';
import * as utils from './utils';
import userGroupService from '../user-group';

export const get = async (id: string): Promise<T.User|null> => {
    const user = await User.findOne({
        where: {
            id,
            isDeleted: false
        },
        raw: true
    }) as T.UserRaw|null;

    return user ? {
        id: user.id,
        age: user.age,
        login: user.login
    } : null;
};

export const create = async (user: T.CreateUserInput): Promise<string> => {
    const password = await utils.getPasswordHash(user.password);
    const userPrepared = { ...user, password };
    const { id } = await User.create(userPrepared);

    return id;
};

export const del = async (id: string): Promise<void> => {
    const user = await User.findOne({
        where: {
            id,
            isDeleted: false
        }
    });

    if (!user) {
        throw new Error(`Failed to delete user ${id}.`);
    }

    const transaction = await modelsUtils.createTransaction();

    await user.update({
        isDeleted: true
    }, { transaction });

    await userGroupService.del({
        where: {
            userId: id
        }
    }, transaction);

    await transaction.commit();
};

export const update = async (user: T.UpdateUserInput): Promise<T.User> => {
    const userInDb = await User.findOne({
        where: {
            id: user.id,
            isDeleted: false
        }
    });

    if (!userInDb) {
        throw new Error(`Failed to update user "${user.id}".`);
    }

    const userUpdated = {
        age: user.age || userInDb.age,
        login: user.login || userInDb.login,
        password: user.password
            ? await utils.getPasswordHash(user.password)
            : userInDb.password
    };

    await userInDb.update(userUpdated, {

    });

    return {
        id: userInDb.id,
        age: userUpdated.age,
        login: userUpdated.login
    } as T.User;
};