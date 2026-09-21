export type UserOptions = {
    role?: 'admin' | 'user';
};

export type User = {
    id: number;
    username: string | null;
    options: UserOptions;
    createdAt: number;
    updatedAt: number;
};
