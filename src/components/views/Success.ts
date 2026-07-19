import { Component } from "../base/Component";
import type { IEvents } from "../base/Events";

export interface ISuccess {
  description: string;
}

export class Success extends Component<ISuccess> {
  private descriptionElement: HTMLElement;
  private closeButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    private events: IEvents,
  ) {
    super(container);

    this.descriptionElement = container.querySelector(
      ".order-success__description",
    )!;

    this.closeButton = container.querySelector(".order-success__close")!;

    this.closeButton.addEventListener("click", () => {
      this.events.emit("success:close");
    });
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }
}
