const responseTime = require('response-time');

import loggers from '#loggers';

const responseTimeLogger = responseTime((req, res, time) => {
    loggers.consoleLogger.info(`Req '${req.url}' took '${time}' milliseconds.`);
});

export default responseTimeLogger;
