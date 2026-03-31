const handle = (err) => {
    let status = 500;

    if (err.type === 'INVARIANT') {
        status = 400;
    }
    else if (err.type === 'VALIDATION') {
        status = 400;
    }
    else if (err.type === 'NOT_FOUND') {
        status = 404;
    }
    else if (err.type === 'CONFLICT') {
        status = 409;
    }
    else if (err.type === 'FORBIDDEN') {
        status = 403;
    }

    console.log(err.message + err.stack);

    return {
        status: status,
        data: err.message,
    }
}

export default handle;