import ProfileEntity from "../../entity/profileEntity.js";

export interface IFactory {
  create(
    id: number | null,
    userId: number,
    phone: string,
    bio: string,
  ): ProfileEntity;
}
