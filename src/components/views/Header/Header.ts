import { IHeader } from "../../../types/index.ts";
import { Component } from "../../base/Component.ts";
import type { EmitterEvent } from "../../base/Events.ts";
import { EventEmitter } from "../../base/Events.ts";

export class Header extends Component<IHeader> implements IHeader {
  // ✅ Поле из интерфейса
  counter: number = 0;

  private basketButton: HTMLButtonElement | null = null;
  private counterElement: HTMLSpanElement | null = null;
  private events: EventEmitter;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container);
    this.events = events;
    this.initializeElements();
    this.setupEventListeners();
    this.updateCounterDisplay();
  }

  private initializeElements(): void {
    this.basketButton = document.querySelector(".header__basket");
    this.counterElement = document.querySelector(".header__basket-counter");

    if (!this.counterElement) {
      this.counterElement = document.createElement("span");
      this.counterElement.className = "header__basket-counter";
      this.container.appendChild(this.counterElement);
    }
  }

  // ✅ Метод для обновления (вместо сеттера)
  updateCounter(value: number): void {
    const oldValue = this.counter;
    this.counter = Math.max(0, value);

    if (this.counterElement) {
      this.counterElement.textContent = String(this.counter);
    }

    this.events.emit("counterChanged", {
      old: oldValue,
      new: this.counter,
    });
  }

  private updateCounterDisplay(): void {
    if (this.counterElement) {
      this.counterElement.textContent = String(this.counter);
    }
  }

  private setupEventListeners(): void {
    this.events.on("counterUpdated", (data: { value: number }) => {
      this.updateCounter(data.value);
    });

    this.events.on("resetCounter", () => {
      this.updateCounter(0);
    });
  }

  render(data?: Partial<IHeader>): HTMLElement {
    super.render(data);
    if (data?.counter !== undefined) {
      this.updateCounter(data.counter);
    }
    return this.container;
  }
}
