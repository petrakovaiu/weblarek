import { Card } from "./Card";
import type { ICardBasket } from "../../../types";
import type { IEvents } from "../../base/Events";

export class CardBasket extends Card<ICardBasket> {
  private indexElement: HTMLElement;
  private deleteButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    private events: IEvents,
  ) {
    super(container);

    this.indexElement = container.querySelector(".basket__item-index")!;

    this.deleteButton = container.querySelector(".basket__item-delete")!;

    this.deleteButton.addEventListener("click", () => {
      this.events.emit("cart:remove");
    });
  }

  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}
