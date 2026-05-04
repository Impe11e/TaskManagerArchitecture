import type { FindProfileQuery } from "./queries/findProfileById.js";
import type { TProfileEntity } from "../../../domain/profiles/domainRequires/application/TProfileEntity.js";

export interface IFindHandler {
  handle(command: FindProfileQuery): Promise<TProfileEntity>;
}
