import type ProfileEntity from "../../entity/profileEntity.js";
import type NewProfileEntity from "../../entity/newProfileEntity.js";
import Id from "../../valueObjects/idObj.js";

export interface IProfileRepository {
  create(entity: NewProfileEntity): Promise<ProfileEntity>;
  update(entity: ProfileEntity): Promise<ProfileEntity>;
  findById(id: Id): Promise<ProfileEntity | null>;
  checkByUserId(userId: number): Promise<boolean>;
  deleteById(id: Id): Promise<boolean>;
}
