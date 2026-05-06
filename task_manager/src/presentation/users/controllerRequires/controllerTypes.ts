type ResponseType = {
    status: number;
    data: unknown;
};

type DataType = {
    username: string;
    email: string;
    password: string;
}

export type { ResponseType, DataType };