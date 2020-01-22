import { User } from '../model/data-access';

const initializeDB = async () => {
    await User.sync({
        force: true
    });

    await User.bulkCreate([
        {
            isDeleted: false,
            login: 'new_login',
            password: 'b68274621c9b2cb69f898caae4c1cf34',
            id:'2fb6d858-391a-435a-9016-7e13e2629fbc'
        },
        {
            isDeleted: false,
            age: 10,
            login: 'login',
            password:'5f4dcc3b5aa765d61d8327deb882cf99',
            id:'110f07d1-2aa6-4d45-93a5-e3f5a171c4d3'
        }
    ]);

    console.log('DB was initialized.');
};

export const initialize = () => {
    initializeDB();
};
