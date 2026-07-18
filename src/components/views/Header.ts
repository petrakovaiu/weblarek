import { IHeader } from "../../types/index.ts";
import { Component } from "../base/Component.ts";

import { EventEmitter } from "../base/Events.ts";
import { IEvents } from "../base/Events.ts";
import { ensureElement } from "../../utils/utils.ts";

export class Header extends Component<IHeader> {
  private basketButton: HTMLButtonElement | null;
  private counterElement: HTMLSpanElement | null;
  private events: IEvents;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container);

    this.events = events;

    this.basketButton = ensureElement<HTMLButtonElement>(
      ".header__basket",
      this.container,
    );
    this.counterElement = ensureElement<HTMLSpanElement>(
      ".header__basket-counter",
      this.container,
    );

    this.counterElement = this.container.querySelector<HTMLSpanElement>(
      ".header__basket-counter",
    );

    this.basketButton?.addEventListener("click", () => {
      this.events.emit("basket:open");
    });
  }

  set counter(value: number) {
    if (this.counterElement) {
      this.counterElement.textContent = String(value);
    }
  }
}

// update(data: Partial<IHeader>) {
//   if (!this.counterElement) {
//     throw new Error("Элемент не найден");
//   }
//   if (!this.counter) {
//     throw new Error("Данные отсутствуют");
//   }
//   this.counter = data?.counter ?? 0;
//   this.counterElement.textContent = String(this.counter);
// }
