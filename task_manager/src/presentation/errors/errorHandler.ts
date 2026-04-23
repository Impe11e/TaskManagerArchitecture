type KnownErrorType =
    | 'INVARIANT'
    | 'VALIDATION'
    | 'NOT_FOUND'
    | 'CONFLICT'
    | 'FORBIDDEN';

type ErrorLike = {
    type?: KnownErrorType,
    message?: string,
    stack?: string,
}

type Response = {
    status: number;
    data: string;
}

const handle = (err: ErrorLike): Response => {
    let status = 500;

    if (err.type === 'INVARIANT') {
        status = 400;
    } else if (err.type === 'VALIDATION') {
        status = 400;
    } else if (err.type === 'NOT_FOUND') {
        status = 404;
    } else if (err.type === 'CONFLICT') {
        status = 409;
    } else if (err.type === 'FORBIDDEN') {
        status = 403;
    }

    console.log((err.message ?? 'No error message') + "\n" + (err.stack ?? 'No error stack'));

    return {
        status: status,
        data: err.message ?? 'Unknown error',
    }
}

export default handle;