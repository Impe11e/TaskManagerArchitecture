import ProfileRepoInterface from "../../../domain/profiles/repoInterfaces/profileRepo.js";
import ProfileMapper from "../mapper/profileMapper.js";
import queries from "./queries.js";

class ProfileRepository extends ProfileRepoInterface {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async create(entity) {
    const { userId, phone, bio } = ProfileMapper.toPersistence(entity);

    const response = await this.pool.query(queries.create, [
      userId,
      phone,
      bio,
    ]);
    return ProfileMapper.toDomain(response.rows[0]);
  }

  async update(entity) {
    const { id, phone, bio } = ProfileMapper.toPersistence(entity);

    const response = await this.pool.query(queries.update, [phone, bio, id]);
    return ProfileMapper.toDomain(response.rows[0]);
  }

  async findById(id) {
    const response = await this.pool.query(queries.findById, [id]);
    const profile = response.rows[0];

    if (!profile) return null;
    return ProfileMapper.toDomain(profile);
  }

  async findByUserId(userId) {
    const response = await this.pool.query(queries.findByUserId, [userId]);
    const profile = response.rows[0];

    if (!profile) return null;
    return ProfileMapper.toDomain(profile);
  }

  async deleteById(id) {
    const response = await this.pool.query(queries.deleteById, [id]);
    return response.rowCount > 0;
  }
}

export default ProfileRepository;
