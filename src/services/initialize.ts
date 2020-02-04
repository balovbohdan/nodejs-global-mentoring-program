import { v4 } from 'uuid';

import { User, Group, UserGroup } from '#model/data-access';

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
            isDeleted: false,
            login: 'new_login',
            password: v4(),
            id:'2fb6d858-391a-435a-9016-7e13e2629fbc'
        },
        {
            isDeleted: false,
            age: 10,
            login: 'login',
            password: v4(),
            id:'110f07d1-2aa6-4d45-93a5-e3f5a171c4d3'
        }
    ]);
};

const initializeDB = async () => {
    await syncTables();
    await createDefaultUsers();
};

export const initialize = () => {
    initializeDB()
        .then(() => {
            console.log('DB was initialized.');
        })
        .catch((error) => {
            console.log(error);
        });
};
