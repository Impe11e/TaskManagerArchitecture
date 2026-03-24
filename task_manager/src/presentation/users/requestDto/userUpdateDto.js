class UserUpdateDto {
    constructor(id, data) {
        this.id = id;

        if (data.email) {
            this.email = data.email;
        }
        if (data.username) {
            this.username = data.username;
        }
        if (data.password) {
            this.password = data.password;
        }
    }
}

export default UserUpdateDto;