import { T } from '#model/data-access/group';

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
