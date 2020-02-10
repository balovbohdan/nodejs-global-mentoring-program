export type AutoSuggestedUsersInput = {
    limit: number;
    loginSubstring?: string;
};

export type AutoSuggestedUsers = Array<{
    id: string;
    login: string;
    age?: number;
}>;
