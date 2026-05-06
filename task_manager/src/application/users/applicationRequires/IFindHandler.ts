import type {FindUserQuery} from "./queries/findUserById.js";
import type {TUserEntity} from "../../../domain/users/domainRequires/application/TUserEntity.js";

export interface IFindHandler {
    handle(command: FindUserQuery): Promise<TUserEntity>;
}