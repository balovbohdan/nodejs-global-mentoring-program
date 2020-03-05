import { Group } from '#models/group';

import * as T from './types';
import * as utils from './utils';

export const get = (input: T.GetGroupsInput = {}): Promise<T.Group[]> => {
    return Group.findAll({
        limit: utils.prepareGetLimit(input.limit),
        raw: true
    });
};
