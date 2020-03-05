import { T } from '#models/group';

export type Group = {
    id: string;
    name: string;
    permissions: T.Permission[];
};

export type GetGroupInput = {
    where: {
        id?: string;
        name?: T.Group;
    };
};

export type CreateGroupInput = {
    name: string;
    permissions: T.Permission[];
};

export type UpdateGroupInput = {
    id: string;
    name?: string;
    permissions?: T.Permission[];
};
