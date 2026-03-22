import UserDto from './userDto.js';

class UserUpdateDto extends UserDto {
    constructor(id, data) {
        super();
        this._validateData(data, false);
        this._validateId(id)

        this.id = id;
        this.email = data.email ?? null;
        this.username = data.username ?? null;
        this.password = data.password ?? null;
    }
}

export default UserUpdateDto;