import UserDto from './userDto.js';

class UserCreateDto extends UserDto {
    constructor(data) {
        super();
        this._validateData(data, true);

        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
    }
}

export default UserCreateDto;