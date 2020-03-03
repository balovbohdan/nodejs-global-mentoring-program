import { Permission } from '#models/group/types';

type Group = {
    id: string;
    name: string;
    permissions: Permission[];
};

export type VerifyUserInput = {
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
    passwordHash: string;
    isDeleted: boolean;
}

export type User = {
    id: string;
    age: number;
    login: string;
    groups?: Group[];
};

export type VerifyPasswordInput = {
    passwordSalt: string;
    passwordHash: string;
    passwordToVerify: string;
};
