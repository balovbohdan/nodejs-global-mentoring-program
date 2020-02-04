import { T } from '#model/data-access/group';

export type Body = {
    name: string;
    permissions: T.Permission[];
};
