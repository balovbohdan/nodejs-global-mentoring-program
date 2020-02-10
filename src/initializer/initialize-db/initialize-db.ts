import { v4 } from 'uuid';

import { User, Group, UserGroup } from '#models';
import * as groupConstants from '#models/group/constants';

const syncTables = async () => {
    await Promise.all([
        User.sync({ force: true }),
        Group.sync({ force: true }),
        UserGroup.sync({ force: true })
    ]);
};

const createDefaultUsers = async () => {
    await User.bulkCreate([
        {
            id: v4(),
            isDeleted: false,
            login: 'new_login',
            password: 'password111'
        },
        {
            id: v4(),
            isDeleted: false,
            login: 'login',
            password: 'password222',
            age: 10
        }
    ]);
};

const createDefaultGroups = async () => {
    await Group.bulkCreate([
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

const initializeDB = async () => {
    await syncTables();
    await Promise.all([
        createDefaultUsers(),
        createDefaultGroups()
    ]);
};

export const initializeDb = () => {
    initializeDB()
        .then(() => {
            console.log('DB was initialized.');
        })
        .catch((error) => {
            console.log(error);
        });
};
