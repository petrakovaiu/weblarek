import { Component } from "../base/Component";
import type { IBasket } from "../../types";
import type { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class Basket extends Component<IBasket> {
  private readonly listElement: HTMLElement;
  private readonly priceElement: HTMLElement;
  private readonly buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.listElement = ensureElement<HTMLElement>(".basket__list", container);
    this.priceElement = ensureElement<HTMLElement>(".basket__price", container);
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".basket__button",
      container,
    );
    this.buttonElement.addEventListener("click", () =>
      events.emit("order:open"),
    );
  }

  set items(items: HTMLElement[]) {
    this.listElement.replaceChildren(...items);
  }

  set total(value: number) {
    this.priceElement.textContent = `${value} синапсов`;
  }

  set valid(value: boolean) {
    this.buttonElement.disabled = !value;
  }
}
