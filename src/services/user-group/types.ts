import { T } from '#models/group';

export type DeleteUserGroupInput = {
    where?: {
        id?: string;
        userId?: string;
        groupId?: string;
    };
};

export type AddUsersInput = {
    group: T.Group;
    userIds: string[];
};
