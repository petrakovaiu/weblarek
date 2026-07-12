import type { IHeader } from "../../../types/index.ts";
import { Component } from "../../base/Component.ts";
import type { EmitterEvent } from "../../base/Events.ts";
import { EventEmitter } from "../../base/Events.ts";

export class Header extends Component<IHeader> {
  private basketButton: HTMLButtonElement;
  private counterElement: HTMLSpanElement;
  private events: EventEmitter; // Добавляет событие
  constructor(container: HTMLElement, events: EventEmitter) {
    super(container);
    this.events = events;
    this.basketButton = document.querySelector(
      ".header__basket",
    ) as HTMLButtonElement;
    this.counterElement = document.querySelector(
      ".header__basket-counter",
    ) as HTMLSpanElement;

    this.updateCounterDisplay();
    this.setupEventListeners();
  }

  private updateCounterDisplay(): void {
    if (this.counterElement) {
      this.counterElement.textContent = this.counter.toString();
    }
  }

  private setupEventListeners(): void {
    //пописка на обновление счетчика
    this.events.on("counterUpdated", (data: { value: number }) => {
      this.counter = data.value;
    });

    //подписка на событие сброса счетчика
    this.events.on("resetCounter", () => {
      this.counter = 0;
    });
  }

  set counter(value: number) {
    // const oldValue = this.counter;
    this.counter = value;
    this.updateCounterDisplay();
    //Генерация события об изменении
    // this.events.emit("counterChanged", {
    //   old: oldValue,
    //   new: value,
    // });
  }
  render(data?: Partial<IHeader>): HTMLElement {
    const container = super.render(data);
    if (!data?.counter) {
      throw new Error("Данные отсутствуют");
    }
    this.counter = data.counter;

    return container;
  }
}
