import * as path from 'path';

export const config = {
    logs: {
        path: path.join(__dirname, '../logs.log')
    },
    server: {
        port: 3000
    },
    entities: {
        user: {
            password: {
                saltRounds: 4
            }
        }
    }
};
