import { Group } from '#models/group';

import * as T from './types';

export const get = (input: T.GetGroupsInput = {}): Promise<T.Group[]> => {
    const minLimit = 1;
    const maxLimit = 20;
    const limit = Math.min(Math.max(input.limit || 0, minLimit), maxLimit);

    return Group.findAll({
        limit,
        raw: true
    });
};
