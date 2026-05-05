import ProfileMapper from "./profilesMapper.js";

class InMemoryProfilesRepository {
  constructor() {
    this.profiles = [];
    this.currentId = 1;
  }

  async create(entity) {
    const data = ProfileMapper.toDataObjNewProfile(entity);
    const row = {
      id: this.currentId++,
      user_id: data.user_id,
      phone: data.phone,
      bio: data.bio,
    };
    this.profiles.push(row);
    return ProfileMapper.toDomain(row);
  }

  async update(entity) {
    const data = ProfileMapper.toDataObjProfile(entity);
    const index = this.profiles.findIndex((p) => p.id === data.id);
    if (index === -1) return null;
    this.profiles[index] = { ...this.profiles[index], ...data };
    return ProfileMapper.toDomain(this.profiles[index]);
  }

  async findById(id) {
    const row = this.profiles.find((p) => p.id === id.value) || null;
    return row ? ProfileMapper.toDomain(row) : null;
  }

  async checkByUserId(userId) {
    return this.profiles.some((p) => p.user_id === userId);
  }

  async deleteById(id) {
    const index = this.profiles.findIndex((p) => p.id === id.value);
    if (index === -1) return false;
    this.profiles.splice(index, 1);
    return true;
  }
}
export default InMemoryProfilesRepository;
