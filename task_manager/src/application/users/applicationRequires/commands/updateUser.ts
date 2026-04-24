export type UpdateUserCommand = {
    id: number;
    username: string | undefined;
    email: string | undefined;
    password: string | undefined;
};