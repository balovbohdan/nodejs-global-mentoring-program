import { T } from '#model/data-access/group';

export type Body = {
    id: string;
    name?: string;
    permissions?: T.Permission[];
};
