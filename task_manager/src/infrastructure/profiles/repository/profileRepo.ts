import type { IProfileRepository } from "../../../domain/profiles/domainRequires/repo/IProfileRepo.js";
import type { TProfileEntity } from "../../../domain/profiles/domainRequires/repo/TProfileEntity.js";
import type { Pool } from "pg";
import ProfileMapper from "../mapper/profileMapper.js";
import queries from "./queries.js";

class ProfileRepository implements IProfileRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async create(entity: TProfileEntity): Promise<TProfileEntity> {
    const profileObj = ProfileMapper.toPersistence(entity);

    const response = await this.pool.query(queries.create, [
      profileObj.user_id,
      profileObj.phone,
      profileObj.bio,
    ]);

    return ProfileMapper.toDomain(response.rows[0]);
  }

  async update(entity: TProfileEntity): Promise<TProfileEntity> {
    const profileObj = ProfileMapper.toPersistence(entity);

    const response = await this.pool.query(queries.update, [
      profileObj.phone,
      profileObj.bio,
      profileObj.id,
    ]);

    return ProfileMapper.toDomain(response.rows[0]);
  }

  async findById(id: number): Promise<TProfileEntity | null> {
    const response = await this.pool.query(queries.findById, [id]);
    const profile = response.rows[0];

    if (!profile) {
      return null;
    }

    return ProfileMapper.toDomain(profile);
  }

  async findByUserId(userId: number): Promise<TProfileEntity | null> {
    const response = await this.pool.query(queries.findByUserId, [userId]);
    const profile = response.rows[0];

    if (!profile) {
      return null;
    }

    return ProfileMapper.toDomain(profile);
  }

  async deleteById(id: number): Promise<boolean> {
    const response = await this.pool.query(queries.deleteById, [id]);
    return (response.rowCount ?? 0) > 0;
  }
}

export default ProfileRepository;
