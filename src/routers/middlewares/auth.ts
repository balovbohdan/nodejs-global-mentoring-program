import * as jwt from 'jwt-simple';

import { config } from '#config';

import * as constants from './constants';

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    if (token) {
        try {
            jwt.decode(token, config.auth.secret, false, config.auth.algorithm);

            next();
        } catch (error) {
            res.status(constants.FORBIDDEN_ERROR_STATUS).end(constants.FORBIDDEN_ERROR_MESSAGE);
        }
    } else {
        res.status(constants.UNAUTHORIZED_ERROR_STATUS).end(constants.UNAUTHORIZED_ERROR_MESSAGE);
    }
};

export default auth;
