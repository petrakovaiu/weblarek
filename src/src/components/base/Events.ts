type EventName = string | RegExp;
type Subscriber = (data?: unknown) => void;

export type EmitterEvent = {
  eventName: string;
  data: unknown;
};

export interface IEvents {
  on<T = unknown>(event: EventName, callback: (data: T) => void): void;
  off(event: EventName, callback: Subscriber): void;
  emit<T = unknown>(event: string, data?: T): void;
  trigger<T = unknown>(event: string, context?: Partial<T>): (data?: T) => void;
}

export class EventEmitter implements IEvents {
  private _events = new Map<EventName, Set<Subscriber>>();

  on<T = unknown>(eventName: EventName, callback: (data: T) => void): void {
    if (!this._events.has(eventName)) {
      this._events.set(eventName, new Set<Subscriber>());
    }
    this._events.get(eventName)!.add(callback as Subscriber);
  }

  off(eventName: EventName, callback: Subscriber): void {
    const subscribers = this._events.get(eventName);
    if (!subscribers) return;
    subscribers.delete(callback);
    if (subscribers.size === 0) this._events.delete(eventName);
  }

  emit<T = unknown>(eventName: string, data?: T): void {
    this._events.forEach((subscribers, name) => {
      const matches =
        name === eventName ||
        name === "*" ||
        (name instanceof RegExp && name.test(eventName));

      if (!matches) return;

      subscribers.forEach((callback) => {
        callback(name === "*" ? { eventName, data } : data);
      });
    });
  }

  onAll(callback: (event: EmitterEvent) => void): void {
    this.on("*", callback);
  }

  offAll(): void {
    this._events.clear();
  }

  trigger<T = unknown>(eventName: string, context?: Partial<T>) {
    return (data?: T) => {
      if (
        data &&
        typeof data === "object" &&
        context &&
        typeof context === "object"
      ) {
        this.emit(eventName, { ...data, ...context });
      } else {
        this.emit(eventName, data ?? context);
      }
    };
  }
}
