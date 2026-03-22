import UserDto from './userDto.js';

class UserFindByIdDto extends UserDto {
    constructor(id) {
        super();
        this._validateId(id);

        this.id = id;
    }
}

export default UserFindByIdDto;