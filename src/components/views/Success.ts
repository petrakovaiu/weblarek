import { Component } from "../base/Component";
import type { ISuccess } from "../../types";
import type { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class Success extends Component<ISuccess> {
  private readonly descriptionElement: HTMLElement;
  private readonly closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.descriptionElement = ensureElement<HTMLElement>(
      ".order-success__description",
      container,
    );
    this.closeButton = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      container,
    );
    this.closeButton.addEventListener("click", () =>
      events.emit("success:close"),
    );
  }

  set total(value: number) {
    this.descriptionElement.textContent = `Списано ${value} синапсов`;
  }
}
