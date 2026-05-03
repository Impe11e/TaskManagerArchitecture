type EventHandler<T> = (event: T) => Promise<void> | void;

class EventBus {
    private handlers = new Map<string, EventHandler<any>[]>();

    subscribe<T>(eventName: string, handler: EventHandler<T>) {
        const list = this.handlers.get(eventName) || [];
        list.push(handler);
        this.handlers.set(eventName, list);
    }

    publish(eventName: string, event: any) {
        const handlers = this.handlers.get(eventName) || [];

        for (const handler of handlers) {
            handler(event);
        }
    }
}