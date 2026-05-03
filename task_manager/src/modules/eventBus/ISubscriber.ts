import type {TAuditEvent} from "../audit/events/IAuditEvent.js";

export interface ISubscriber {
    handle(event: TAuditEvent) : unknown
}