import loggers from '#loggers';

export const setNodeEventListeners = () => {
    // @ts-ignore
    process.on('uncaughtException', (error, origin) => {
        loggers.globalErrorsLogger.fatal(`${error}\nException origin: ${origin}`);
    });

    process.on('unhandledRejection', (reason, promise) => {
        loggers.globalErrorsLogger.error('Unhandled Rejection at:', promise, 'Reason: ', reason);
    });
};
