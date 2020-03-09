import { startServer } from './start-server';
import { initializeDb } from './initialize-db';
import { setNodeEventListeners } from './set-node-event-listeners';

export const initialize = async () => {
    setNodeEventListeners();
    await initializeDb();
    startServer();
};
