import * as md5 from 'md5';

import * as T from './types';
import { User } from '../../data-access';

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
    const userPrepared = Object.assign({}, user, {
        password: md5(user.password)
    });
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

    await user.update({
        isDeleted: true
    });
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
            ? md5(user.password)
            : userInDb.password
    };

    await userInDb.update(userUpdated);

    return {
        id: userInDb.id,
        age: userUpdated.age,
        login: userUpdated.login
    } as T.User;
};
