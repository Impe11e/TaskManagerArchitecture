import ProfileDtoMapper from "../dtoMapper/profileDtoMapper.js";

class UpdateProfile {
  constructor(repository) {
    this.repository = repository;
  }

  execute(dto) {
    const { id, ...data } = dto;

    const profile = this.repository.findById(id);
    if (!profile) {
      throw new Error("Profile not found");
    }

    profile.update({
      phone: data.phone,
      bio: data.bio,
    });

    const updatedProfile = this.repository.update(profile);
    return ProfileDtoMapper.toDto(updatedProfile);
  }
}

export default UpdateProfile;
