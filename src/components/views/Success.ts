import { ISuccess } from "../../types/index.ts";
import { Component } from "../base/Component.ts";
import type { IEvents } from "../base/Events.ts";

import { ensureElement } from "../../utils/utils.ts";

export class Modal extends Component<ISuccess> {
  private events: IEvents;
  private totalCostElement: HTMLElement;
  private acceptButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    this.totalCostElement = ensureElement<HTMLButtonElement>(
      ".order-success__description",
      this.container,
    );
    this.acceptButton = ensureElement<HTMLButtonElement>(
      ".button order-success__close",
      this.container,
    );
    this.acceptButton.addEventListener("click", () => {
      this.events.emit("modal:close");
    });
  }
  set totalCost(value: number) {
    if (this.totalCostElement) {
      this.totalCostElement.textContent = `Списано ${value} синапсов`;
    }
  }
}
