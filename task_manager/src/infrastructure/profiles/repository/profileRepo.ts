import type { IProfileRepository } from "../../../domain/profiles/domainRequires/repo/IProfileRepo.js";
import type { TProfileEntity } from "../../../domain/profiles/domainRequires/repo/TProfileEntity.js";
import type { TNewProfileEntity } from "../../../domain/profiles/domainRequires/repo/TNewProfileEntity.js";
import type { Pool } from "pg";
import ProfileMapper from "../mapper/profileMapper.js";
import queries from "./queries.js";
import Id from "../../../domain/profiles/valueObjects/idObj.js";

class ProfileRepository implements IProfileRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async create(entity: TNewProfileEntity): Promise<TProfileEntity> {
    const data = ProfileMapper.toDataObjNewProfile(entity);
    const response = await this.pool.query(queries.create, [
      data.user_id,
      data.phone,
      data.bio,
    ]);

    return ProfileMapper.toDomain(response.rows[0]);
  }

  async update(entity: TProfileEntity): Promise<TProfileEntity> {
    const data = ProfileMapper.toDataObjProfile(entity);
    const response = await this.pool.query(queries.update, [
      data.phone,
      data.bio,
      data.id,
    ]);
    return ProfileMapper.toDomain(response.rows[0]);
  }

  async findById(id: Id): Promise<TProfileEntity | null> {
    const response = await this.pool.query(queries.findById, [id.value]);
    if (response.rowCount === 0) return null;
    return ProfileMapper.toDomain(response.rows[0]);
  }

  async checkByUserId(userId: number): Promise<boolean> {
    const response = await this.pool.query(queries.findByUserId, [userId]);
    return (response.rowCount ?? 0) > 0;
  }

  async deleteById(id: Id): Promise<boolean> {
    const response = await this.pool.query(queries.deleteById, [id.value]);
    return (response.rowCount ?? 0) > 0;
  }
}

export default ProfileRepository;
