import * as path from 'path';
import * as JSONdb from 'simple-json-db';

const dbPath = path.join(__dirname, 'db-file.json');

export const db = new JSONdb(dbPath, {
    asyncWrite: true
});
