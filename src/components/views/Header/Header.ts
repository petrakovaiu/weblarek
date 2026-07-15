import { IHeader } from "../../../types/index.ts";
import { Component } from "../../base/Component.ts";
import type { EmitterEvent } from "../../base/Events.ts";
import { EventEmitter } from "../../base/Events.ts";

export class Header extends Component<IHeader> {
  private basketButton: HTMLButtonElement;
  private counterElement: HTMLSpanElement;

  private counterSubscriber: { counterSubscriber: () => void };
  constructor(
    private container: HTMLElement,
    counterSubscriber: { counterSubscriber: () => void },
    // events: EventEmitter,
  ) {
    super(container);
    // this.events = events;
    this.basketButton = document.querySelector(
      ".header__basket",
    ) as HTMLButtonElement;
    this.counterElement = document.querySelector(
      ".header__basket-counter",
    ) as HTMLSpanElement;

    this.updateCounterDisplay();
    // this.setupEventListeners();
  }

  private updateCounterDisplay(): void {
    if (this.counterElement) {
      this.counterElement.textContent = String(this.counter);
    }
  }

  private set counter(value: number) {
    this.counterElement.textContent = String(value);
  }

  render(data?: Partial<IHeader>): HTMLElement {
    const container = super.render(data);
    !data?.counter ? (this.counter = 0) : (this.counter = data.counter);
    return container;
  }
}

// export class Header extends Component<IHeader> {
//   private basketButton: HTMLButtonElement;
//   private counterElement: HTMLSpanElement;
//   private events: EventEmitter;
//   // private counter: number;

//   constructor(
//     container: HTMLElement,
//     private cardSubscriber: { cardSubscriber: () => void },
//     events: EventEmitter, // Добавляем events как 3-й параметр
//   ) {
//     super(container);
//     this.events = events;
//     // this.counter = counter;
//     this.basketButton = document.querySelector(
//       ".header__basket",
//     ) as HTMLButtonElement;
//     this.counterElement = document.querySelector(
//       ".header__basket-counter",
//     ) as HTMLSpanElement;

//     this.updateCounterDisplay();
//     this.setupEventListeners();
//   }

//   private setupEventListeners(): void {
//     this.events.on("counterUpdated", (data: { counter: number }) => {
//       this.counter = data.counter;
//     });

//     this.events.on("resetCounter", () => {
//       this.counter = 0;
//     });
//   }

//   private updateCounterDisplay(): void {
//     if (this.counterElement) {
//       this.counterElement.textContent = String(this.counter);
//     }
//   }

//   private set counter(value: number) {
//     this.counterElement.textContent = String(value);
//   }

//   render(data?: Partial<IHeader>): HTMLElement {
//     const container = super.render(data);
//     this.counter = data?.counter ?? 0;
//     return container;
//   }
// }
