class DeleteProfileById {
  constructor(repository) {
    this.repository = repository;
  }

  execute(dto) {
    const id = dto.id;
    const exists = this.repository.findById(id);

    if (!exists) {
      throw new Error("Profile not found");
    }

    return this.repository.deleteById(id);
  }
}

export default DeleteProfileById;
