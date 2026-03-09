const handle = (err) => {
    const status = err.status || 500;
    return {
        status: status,
        data: err.message,
    }
}

export default handle;