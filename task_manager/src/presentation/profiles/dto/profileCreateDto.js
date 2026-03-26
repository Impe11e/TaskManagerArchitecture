import ProfileDto from "./profileDto.js";

class ProfileCreateDto extends ProfileDto {
  constructor(data) {
    super();
    this._validateData(data);

    this.userId = data.userId;
    this.phone = data.phone;
    this.bio = data.bio || "";

    Object.freeze(this);
  }
}
export default ProfileCreateDto;
