import { T } from '#model/data-access/group';

export type Body = {
    group: T.Group;
    userIds: string[];
};
