import { omit } from 'ramda';

import { User, Group } from '#models';
import * as modelsUtils from '#models/utils';
import userGroupService from '#services/user-group';

import * as T from './types';
import * as utils from './utils';
import * as constants from './constants';

export const verify = async ({ login, password }: T.VerifyUserInput) => {
    const user = await User.findOne({
        where: { login },
        raw: true
    });

    if (!user) {
        throw new Error(`Failed to verify "${login}" user.`);
    }

    await utils.verifyPassword({
        passwordToVerify: password,
        passwordHash: user.password,
        passwordSalt: user.passwordSalt
    });

    return { id: user.id };
};

export const get = async (id: string): Promise<T.User|null> => {
    const user = await User.findOne({
        where: {
            id,
            isDeleted: false
        },
        include: [{
            model: Group,
            as: 'groups',
            required: false,
            attributes: ['id', 'name', 'permissions'],
            through: { attributes: [] }
        }]
    });

    if (!user) {
        return null;
    }

    const userRaw = user.get({ plain: true }) as T.UserRaw;

    return omit<T.UserRaw, string>(constants.SECRET_USER_PROPS, userRaw) as T.User;
};

export const create = async (user: T.CreateUserInput): Promise<string> => {
    const passwordSalt = await utils.genPasswordSalt();
    const password = await utils.getPasswordHash(user.password, passwordSalt);
    const userPrepared = { ...user, password, passwordSalt };
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

    const passwordSalt = await utils.genPasswordSalt();
    const userUpdated = {
        age: user.age || userInDb.age,
        login: user.login || userInDb.login,
        passwordSalt: user.password ? passwordSalt : userInDb.passwordSalt,
        password: user.password
            ? await utils.getPasswordHash(user.password, passwordSalt)
            : userInDb.password
    };

    await userInDb.update(userUpdated);

    return {
        id: userInDb.id,
        age: userUpdated.age,
        login: userUpdated.login
    } as T.User;
};
