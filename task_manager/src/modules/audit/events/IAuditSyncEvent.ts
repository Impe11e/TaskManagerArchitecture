export type TAuditSyncEvent = {
    operation: string;
    entityId: number;
    payload: object;
    occurredAt: Date;
};