import ProfileDtoMapper from "../dtoMapper/profileDtoMapper.js";

class FindProfileById {
  constructor(repository) {
    this.repository = repository;
  }

  execute(dto) {
    const id = dto.id;
    const profileEntity = this.repository.findById(id);

    if (!profileEntity) {
      throw new Error("Profile not found");
    }

    return ProfileDtoMapper.toDto(profileEntity);
  }
}

export default FindProfileById;
