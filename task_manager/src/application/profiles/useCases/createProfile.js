import ProfileEntity from "../../../domain/profiles/entity/profileEntity.js";
import ProfileDtoMapper from "../dtoMapper/profileDtoMapper.js";

class CreateProfile {
  constructor(repository) {
    this.repository = repository;
  }

  execute(dto) {
    const existing = this.repository.findByUserId(dto.userId);
    if (existing) throw new Error("Profile already exists");

    const entity = ProfileEntity.createEntityWithoutId(
      dto.userId,
      dto.phone,
      dto.bio,
    );
    const savedEntity = this.repository.create(entity);

    return ProfileDtoMapper.toDto(savedEntity);
  }
}

export default CreateProfile;
