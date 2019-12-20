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
};
