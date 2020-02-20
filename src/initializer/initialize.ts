import { startServer } from './start-server';
import { initializeDb } from './initialize-db';

export const initialize = () => {
    startServer();
    initializeDb();
};
