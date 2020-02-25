import * as path from 'path';

export const config = {
    logs: {
        path: path.join(__dirname, '../logs.log')
    },
    model: {
        postgresql: {
            uri: 'postgres://postgres:1111@localhost:5432/postgres'
        }
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
