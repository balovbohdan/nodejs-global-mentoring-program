import * as constants from './constants';

export const prepareGetLimit = (limit) => {
    const limitWithDefault = limit || constants.GET_LIMITS.DEFAULT;
    const limitWithMin = Math.max(limitWithDefault, constants.GET_LIMITS.MIN);
    const limitWithMax = Math.min(limitWithMin, constants.GET_LIMITS.MAX);

    return limitWithMax;
};
