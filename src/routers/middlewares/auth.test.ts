import * as jwt from 'jwt-simple';

import { config } from '#config';

import auth from './auth';
import * as constants from './constants';

const req = {
  header: jest.fn().mockReturnValue(
    jwt.encode({
      user: { id: '4234234' },
      exp: Date.now() + config.auth.tokenLifespan
    }, config.auth.secret, config.auth.algorithm)
  ),
};

const end = jest.fn();

const res = {
  status: jest.fn().mockReturnValue({ end }),
};

const next = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('auth middleware', () => {
  it('should get authorization token from header', () => {
    auth(req, res, next);

    expect(req.header).toBeCalledTimes(1);
    expect(req.header).toHaveBeenCalledWith('Authorization');
  });

  it('should give control to next step', () => {
    auth(req, res, next);

    expect(next).toBeCalledTimes(1);
  });

  it('should send forbidden error if token is invalid', () => {
    req.header = jest.fn().mockReturnValue('dqwhdquiwh');
    auth(req, res, next);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(constants.FORBIDDEN_ERROR_STATUS);
    expect(end).toHaveBeenCalledWith(constants.FORBIDDEN_ERROR_MESSAGE);
  });

  it('should send authorization error if no token found', () => {
    req.header = jest.fn().mockReturnValue(null);
    auth(req, res, next);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(constants.UNAUTHORIZED_ERROR_STATUS);
    expect(end).toHaveBeenCalledWith(constants.UNAUTHORIZED_ERROR_MESSAGE);
  });
});
