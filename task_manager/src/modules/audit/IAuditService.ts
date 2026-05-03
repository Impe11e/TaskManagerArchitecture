import type {TAuditEvent} from "./events/IAuditEvent.js";

interface IAuditService {
    log(event: TAuditEvent): void;
}

export type { IAuditService, TAuditEvent };
