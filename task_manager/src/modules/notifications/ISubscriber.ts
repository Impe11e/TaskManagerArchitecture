import type { TNotificationEvent } from "./events/INotificationEvent";

export interface ISubscriber {
    handle(event: TNotificationEvent): unknown;
}
