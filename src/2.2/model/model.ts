import * as md5 from 'md5';
import { v4 } from 'uuid';

import { T } from './index';
import { db } from '../db';

export const getUser = async (id: string): Promise<T.User|null> => {
    const dbResponse: string = await db.get(id);

    if (!dbResponse) {
        return null;
    }

    const user: T.UserRaw = JSON.parse(dbResponse);

    return user.isDeleted ? null : {
        id: user.id,
        age: user.age,
        login: user.login
    };
};

export const createUser = async (user: T.CreateUserInput): Promise<string> => {
    const meta = {
        id: v4(),
        password: md5(user.password)
    };
    const userDefault = { isDeleted: false };
    const userPrepared = {
        ...userDefault,
        ...user,
        ...meta
    };
    const userSerialized = JSON.stringify(userPrepared);

    await db.set(meta.id, userSerialized);

    return meta.id;
};

export const deleteUser = async (id: string): Promise<void> => {
    const dbResponse: string = await db.get(id);
    const userInDb: T.UserRaw = JSON.parse(dbResponse);

    if (!userInDb) {
        throw new Error(`Failed to delete user ${id}.`);
    }

    const userUpdated: T.UserRaw = {
        ...userInDb,
        isDeleted: true
    };

    await db.set(id, JSON.stringify(userUpdated));
};

export const updateUser = async (user: T.UpdateUserInput): Promise<T.User> => {
    const dbResponse: string = await db.get(user.id);
    const userInDb: T.UserRaw = JSON.parse(dbResponse);

    if (!userInDb) {
        throw new Error(`Failed to update user ${user.id}.`);
    }

    const userUpdated: T.UserRaw = {
        id: userInDb.id,
        isDeleted: userInDb.isDeleted,
        age: user.age || userInDb.age,
        login: user.login || userInDb.login,
        password: user.password
            ? md5(user.password)
            : userInDb.password
    };

    await db.set(user.id, JSON.stringify(userUpdated));

    return {
        id: userUpdated.id,
        age: userUpdated.age,
        login: userUpdated.login
    } as T.User;
};

export const getAutoSuggestedUsers = async ({ limit, loginSubstring }:
    T.AutoSuggestedUsersInput) => {
    const dbResponse = await db.JSON();

    const users = Object.values(dbResponse)
        .map((user) => {
            const { id, age, login, isDeleted } = JSON.parse(user as string);

            return { id, age, login, isDeleted };
        })
        .filter(({ isDeleted }) => !isDeleted)
        .map(user => ({
            id: user.id,
            age: user.age,
            login: user.login
        }));

    const loginSubstringRegExp = loginSubstring && new RegExp(`.*${loginSubstring}.*`, 'i');
    const usersFiltered = loginSubstringRegExp ? (
        users.filter(user => loginSubstringRegExp.test((user as T.User).login))
    ) : users;

    return usersFiltered.slice(0, limit + 1);
};
