import loggers from '#loggers';

export const setNodeEventListeners = () => {
    // @ts-ignore
    process.on('uncaughtException', (error, origin) => {
        loggers.globalErrorsLogger.error(`Uncaught Exception`, { origin });
    });

    process.on('unhandledRejection', (reason, promise) => {
        loggers.globalErrorsLogger.error('Unhandled Rejection', { promise, reason });
    });
};
