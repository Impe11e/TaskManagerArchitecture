import UserDto from './userDto.js';

class UserUpdateDto extends UserDto {
    constructor(id, data) {
        super();
        this._validateData(data, false);
        this._validateId(id)

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