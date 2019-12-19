export type UserInput = {
    age: number;
    login: string;
    password: string;
};

export type User = {
    id: string;
    age: number;
    login: string;
    isDeleted: boolean;
};
