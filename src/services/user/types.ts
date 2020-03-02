import { Permission } from '#models/group/types';

type Group = {
    id: string;
    name: string;
    permissions: Permission[];
};

export type VerifyInput = {
    login: string;
    password: string;
};

export type UpdateUserInput = {
    id: string;
    age?: number;
    login?: string;
    password?: string;
};

export type CreateUserInput = {
    age: number;
    login: string;
    password: string;
};

export type UserRaw = User & {
    password: string;
    isDeleted: boolean;
}

export type User = {
    id: string;
    age: number;
    login: string;
    groups?: Group[];
};
