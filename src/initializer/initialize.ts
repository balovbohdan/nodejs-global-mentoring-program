import { v4 } from 'uuid';

import { User } from '../models';

const initializeDB = async () => {
    await User.sync({
        force: true
    });

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

export const initialize = () => {
    initializeDB()
        .then(() => {
            console.log('DB was initialized.');
        })
        .catch(() => {
            console.error('Failed to initialize DB.');
        });
};
