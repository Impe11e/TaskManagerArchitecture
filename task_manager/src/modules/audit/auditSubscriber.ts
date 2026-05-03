import type {IAuditService, TAuditEvent} from "./IAuditService.js";
import type {ISubscriber} from "../eventBus/ISubscriber.js";

class AuditSubscriber implements ISubscriber{
    constructor(private audit: IAuditService) {}

    async handle(event: TAuditEvent) {
        try {
            this.audit.log(event);
        }
        catch (error) {
            console.error("Error while audit logging occurred:");
            console.error(error);
        }
    }
}

export default AuditSubscriber;