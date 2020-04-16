import * as responseTimeModule from 'response-time';

import loggers from '#loggers';

// Fix for "./response-time-logger.test.js".
const responseTime = typeof responseTimeModule === 'function'
    ? responseTimeModule
    : responseTimeModule.default;

const responseTimeLogger = responseTime((req, res, time) => {
    loggers.consoleLogger.info(`Req '${req.url}' took '${time}' milliseconds.`);
});

export default responseTimeLogger;

