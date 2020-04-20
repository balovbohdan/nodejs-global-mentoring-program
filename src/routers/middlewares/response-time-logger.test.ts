import loggers from '#loggers';

import responseTimeLogger from './response-time-logger';

jest.mock('#loggers', () => ({
  consoleLogger: {
    info: jest.fn(),
  },
}));

const req = {
  url: '/test-url',
};
const res = {
  setHeader: jest.fn(),
  writeHead: jest.fn(),
};
const next = jest.fn();

describe('response time logger middleware', () => {
  it('should log response time', () => {
    responseTimeLogger(req, res, next);
    res.writeHead(200);

    expect(next).toBeCalledTimes(1);
    expect(loggers.consoleLogger.info).toBeCalledTimes(1);
    expect(loggers.consoleLogger.info.mock.calls[0][0]).toMatch(
      /Req '\/test-url' took '[\d.]+' milliseconds\./
    );
  });
});
