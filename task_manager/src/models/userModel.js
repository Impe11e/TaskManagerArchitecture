const userFactory = (id, data) => {
    return {
        id: id,
        username: data.username,
        email: data.email,
        password: data.password,
    }
}

export default userFactory;