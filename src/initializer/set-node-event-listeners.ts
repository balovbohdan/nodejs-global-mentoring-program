export const setNodeEventListeners = () => {
    // @ts-ignore
    process.on('uncaughtException', (err, origin) => {
        console.error(`${err}\nException origin: ${origin}`);
    });

    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'Reason: ', reason);
    });
};
