import { T } from '../../data-access/group';

export type Group = {
    name: string;
    permissions: T.Permission[];
};

export type GetGroupsInput = {
    limit?: number;
};
