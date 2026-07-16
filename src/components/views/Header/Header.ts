import { IHeader } from "../../../types/index.ts";
import { Component } from "../../base/Component.ts";
import type { EmitterEvent } from "../../base/Events.ts";
import { EventEmitter } from "../../base/Events.ts";

export class Header extends Component<IHeader> implements IHeader {
  // ✅ Поле из интерфейса
  private basketButton: HTMLButtonElement | null = null;
  private counterElement: HTMLSpanElement | null = null;
  private events: EventEmitter;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container);
    this.events = events;
    this.basketButton = document.querySelector(".header__basket");
    this.counterElement = document.querySelector(".header__basket-counter");
    if (this.basketButton) {
      this.basketButton.addEventListener("click", (event) => {});
    }
    // Здесь размещается логика, которая должна выполняться при клике
  }
  set counter(value: number) {
    if (!this.counterElement) {
      throw new Error("Элемент не найден");
    }
    this.counterElement.textContent = String(value);
  }

  render(data?: Partial<IHeader>): HTMLElement {
    const container = super.render(data);
    this.counter = data?.counter ?? 0;
    return container;
  }
}
