export const setNodeEventListeners = () => {
    // @ts-ignore
    process.on('uncaughtException', (err, origin) => {
        console.error(`${err}\nException origin: ${origin}`);
    });
};
