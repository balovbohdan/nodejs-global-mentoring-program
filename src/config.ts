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
