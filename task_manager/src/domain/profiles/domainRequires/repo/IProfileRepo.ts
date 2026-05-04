import type { TProfileEntity } from "../application/TProfileEntity.js";

export interface IProfileRepository {
  create(entity: TProfileEntity): Promise<TProfileEntity>;
  update(entity: TProfileEntity): Promise<TProfileEntity>;
  findById(id: number): Promise<TProfileEntity | null>;
  findByUserId(userId: number): Promise<TProfileEntity | null>;
  deleteById(id: number): Promise<boolean>;
}
