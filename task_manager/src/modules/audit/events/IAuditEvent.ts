export type TAuditEvent = {
  operation: string;
  entityId: number;
  payload: object;
  occurredAt: Date;
};
