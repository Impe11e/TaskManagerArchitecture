import ProfileDto from "./profileDto.js";

class ProfileFindByIdDto extends ProfileDto {
  constructor(id) {
    super();
    this._validateId(id);
    this.id = id;

    Object.freeze(this);
  }
}

export default ProfileFindByIdDto;
