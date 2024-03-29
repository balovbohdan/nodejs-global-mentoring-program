import { v4 } from 'uuid';

import loggers from '#loggers';
import * as userUtils from '#services/user/utils';
import * as models from '#models';
import { CustomModel } from '#models/types';
import * as groupConstants from '#models/group/constants';

const associateTables = () => {
    const modelClasses = Object.values(models) as CustomModel[];

    modelClasses.forEach((model) => {
        if (typeof model.associate === 'function') {
            model.associate(models);
        }
    });
};

const syncTables = async () => {
    await Promise.all([
        models.User.sync({ force: true }),
        models.Group.sync({ force: true }),
        models.UserGroup.sync({ force: true })
    ]);
};

const createDefaultUsers = async () => {
    await models.User.bulkCreate([
        {
            id: v4(),
            isDeleted: false,
            login: 'new_login',
            password: 'password111',
            passwordSalt: await userUtils.genPasswordSalt()
        },
        {
            id: v4(),
            isDeleted: false,
            login: 'login',
            password: 'password222',
            passwordSalt: await userUtils.genPasswordSalt(),
            age: 10
        }
    ]);
};

const createDefaultGroups = async () => {
    await models.Group.bulkCreate([
        {
            id: v4(),
            name: groupConstants.DEFAULT_GROUPS.ADMIN,
            permissions: Object.values(groupConstants.PERMISSIONS)
        },
        {
            id: v4(),
            name: groupConstants.DEFAULT_GROUPS.USER,
            permissions: [
                groupConstants.PERMISSIONS.READ
            ]
        }
    ]);
};

export const initializeDb = async () => {
    await syncTables();
    associateTables();
    await Promise.all([
        createDefaultUsers(),
        createDefaultGroups()
    ]);
    console.log('DB was initialized');
};
