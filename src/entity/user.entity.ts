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

export interface UserRow {
    id: number;
    username: string | null;
    options: string;
    created_at: number;
    updated_at: number;
}
