import { T } from '#model/data-access/group';

export type Group = {
    id: string;
    name: string;
    permissions: T.Permission[];
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
