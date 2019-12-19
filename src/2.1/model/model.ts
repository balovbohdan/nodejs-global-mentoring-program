import * as md5 from 'md5';
import { v4 } from 'uuid';

import { T } from '.';
import { db } from '../db';

export const getUser = async (id: string): Promise<T.User|null> => {
    const user = db.get(id);

    return user || null;
};

export const createUser = async (user: T.UserInput): Promise<string> => {
    const meta = {
        id: v4(),
        password: md5(user.password)
    };
    const userDefault = { isDeleted: false };
    const userPrepared = Object.assign({}, userDefault, user, meta);
    const userSerialized = JSON.stringify(userPrepared);

    await db.set(meta.id, userSerialized);

    return meta.id;
};
