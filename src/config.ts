import { v4 } from 'uuid';
import * as path from 'path';

export const config = {
    auth: {
        secret: v4(),
        algorithm: <'HS256'>'HS256',
        tokenLifespan: 10 * 60 * 1000
    },
    logs: {
        path: path.join(__dirname, '../logs.log')
    },
    model: {
        postgresql: {
            uri: 'postgres://postgres:1111@localhost:5432/postgres'
        }
    },
    server: {
        port: 3000,
        host: 'http://localhost'
    },
    entities: {
        user: {
            password: {
                saltRounds: 4
            }
        }
    }
};
