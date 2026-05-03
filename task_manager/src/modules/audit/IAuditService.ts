import type {TAuditSyncEvent} from "./events/IAuditSyncEvent.js";

interface IAuditService {
    log(event: TAuditSyncEvent): void;
}

export type { IAuditService, TAuditSyncEvent };
