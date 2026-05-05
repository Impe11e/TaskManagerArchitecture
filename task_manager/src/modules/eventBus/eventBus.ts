type TEventHandler<T> = (event: T) => Promise<void> | void;

class EventBus {
    private handlers = new Map<string, TEventHandler<any>[]>();

    subscribe<T>(eventName: string, handler: TEventHandler<T>) {
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

export default EventBus;
export type { TEventHandler };
