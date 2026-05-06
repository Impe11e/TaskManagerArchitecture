type Response = {
    status: number;
    data: string;
};

function isObject(err: unknown): err is Record<string, unknown> {
    return typeof err === 'object' && err !== null;
}

function hasType(err: unknown): err is { type: string } {
    return isObject(err) && typeof err.type === 'string';
}

function getMessage(err: unknown): string {
    if (isObject(err) && typeof err.message === 'string') {
        return err.message;
    }
    if (typeof err === 'string') {
        return err;
    }
    return 'Unknown error';
}

function getStack(err: unknown): string {
    if (isObject(err) && typeof err.stack === 'string') {
        return err.stack;
    }
    return 'No error stack';
}

const handle = (err: unknown): Response => {
    let status = 500;

    if (hasType(err)) {
        switch (err.type) {
            case 'INVARIANT':
            case 'VALIDATION':
                status = 400;
                break;
            case 'NOT_FOUND':
                status = 404;
                break;
            case 'CONFLICT':
                status = 409;
                break;
            case 'FORBIDDEN':
                status = 403;
                break;
        }
    }

    const message = getMessage(err);
    const stack = getStack(err);

    console.log(message + "\n" + stack);

    return {
        status,
        data: message,
    };
};

export { handle };
export default handle;