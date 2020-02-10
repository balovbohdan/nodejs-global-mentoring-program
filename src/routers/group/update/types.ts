import { T } from '#models/group';

export type Body = {
    id: string;
    name?: string;
    permissions?: T.Permission[];
};
