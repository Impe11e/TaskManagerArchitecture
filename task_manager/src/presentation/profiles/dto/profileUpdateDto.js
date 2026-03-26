import ProfileDto from "./profileDto.js";

class ProfileUpdateDto extends ProfileDto {
  constructor(id, data) {
    super();

    this._validateId(id);
    this._validateData(data);

    this.id = id;

    this.phone = data.phone;
    this.bio = data.bio;

    Object.freeze(this);
  }
}

export default ProfileUpdateDto;
