class UserCreateDto {
    constructor(data) {
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
    }
}

export default UserCreateDto;