type TAuditEvent = {
    operation: string;
    entityId: number;
    payload: unknown;
    occurredAt: Date;
};

interface IAuditService {
    log(event: TAuditEvent): void;
}

export type { IAuditService, TAuditEvent };
