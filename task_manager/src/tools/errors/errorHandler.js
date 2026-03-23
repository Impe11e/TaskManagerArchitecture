const handle = (err) => {
    console.log(err.name, err.message);
    let status = err.status || 500;

    if (err.name === 'DomainError') {
        status = 400;
    }

    return {
        status: status,
        data: err.message,
    }
}

export default handle;