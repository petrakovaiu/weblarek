import type { IHeader } from "../../types";
import { Component } from "../base/Component";
import type { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class Header extends Component<IHeader> {
  private basketButton: HTMLButtonElement;
  private counterElement: HTMLSpanElement;

  constructor(
    container: HTMLElement,
    private events: IEvents,
  ) {
    super(container);

    this.basketButton = ensureElement<HTMLButtonElement>(
      ".header__basket",
      this.container,
    );

    this.counterElement = ensureElement<HTMLSpanElement>(
      ".header__basket-counter",
      this.container,
    );

    this.basketButton.addEventListener("click", () => {
      this.events.emit("basket:open");
    });
  }

  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}
