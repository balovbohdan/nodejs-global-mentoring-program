import { T } from '#models/group';

export type Body = {
    name: string;
    permissions: T.Permission[];
};
