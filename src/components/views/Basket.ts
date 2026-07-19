import { Component } from "../base/Component";
import type { IBasket } from "../../types";
import type { IEvents } from "../base/Events";

export class Basket extends Component<IBasket> {
  private listElement: HTMLElement;
  private priceElement: HTMLElement;
  private buttonElement: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    private events: IEvents,
  ) {
    super(container);

    this.listElement = container.querySelector(".basket__list")!;

    this.priceElement = container.querySelector(".basket__price")!;

    this.buttonElement = container.querySelector(".basket__button")!;

    this.buttonElement.addEventListener("click", () => {
      this.events.emit("order:open");
    });
  }

  set items(items: HTMLElement[]) {
    this.listElement.replaceChildren(...items);
  }

  set price(value: number) {
    this.priceElement.textContent = `${value} синапсов`;
  }
}
