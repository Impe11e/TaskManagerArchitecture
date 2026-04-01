class ProfileUpdateDto {
  constructor(id, data) {
    this.id = id;

    if (data.phone) {
      this.phone = data.phone;
    }
    if (data.bio !== undefined) {
      this.bio = data.bio;
    }
  }
}

export default ProfileUpdateDto;
