import NewProfileEntity from "../../entity/newProfileEntity.js";

export interface IFactory {
  create(userId: number, phone: string, bio: string): NewProfileEntity;
}
