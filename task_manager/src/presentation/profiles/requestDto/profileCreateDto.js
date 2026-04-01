class ProfileCreateDto {
  constructor(data) {
    this.userId = data.userId;
    this.phone = data.phone;
    this.bio = data.bio || "";
  }
}

export default ProfileCreateDto;
