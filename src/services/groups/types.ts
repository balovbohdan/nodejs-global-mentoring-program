import { T } from '#models/group';

export type Group = {
    name: string;
    permissions: T.Permission[];
};

export type GetGroupsInput = {
    limit?: number;
};
