const handle = (err) => {
    let status = err.status || 500;

    if (err.name === 'DomainError') {
        status = 100;
    }

    return {
        status: status,
        data: err.message,
    }
}

export default handle;