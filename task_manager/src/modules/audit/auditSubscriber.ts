import type {IAuditService, TAuditEvent} from "./IAuditService.js";
import type {ISubscriber} from "../eventBus/ISubscriber.js";

class AuditSubscriber implements ISubscriber{
    constructor(private audit: IAuditService) {}

    async handle(event: TAuditEvent) {
        this.audit.log(event);
    }
}

export default AuditSubscriber;