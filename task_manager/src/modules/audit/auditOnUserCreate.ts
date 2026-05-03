import type {IAuditService} from "./IAuditService.js";

class AuditOnUserCreated {
    constructor(private audit: IAuditService) {}

    async handle(event: TEventUserCreated) {
        this.audit.log({
            operation: "User Created",
            entityId: event.userId,
            payload: { email: event.email,
                       username: event.username},
            occurredAt: event.occurredAt,
        });
    }
}