import { T } from '#models/group';

export type Body = {
    group: T.Group;
    userIds: string[];
};
