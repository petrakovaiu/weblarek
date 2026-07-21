import { Card } from "./Card";
import type { ICardBasket } from "../../../types";
import { ensureElement } from "../../../utils/utils";

type CardBasketActions = {
  onDelete: () => void;
};

export class CardBasket extends Card<ICardBasket> {
  private readonly indexElement: HTMLElement;
  private readonly deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions: CardBasketActions) {
    super(container);
    this.indexElement = ensureElement<HTMLElement>(
      ".basket__item-index",
      container,
    );
    this.deleteButton = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      container,
    );
    this.deleteButton.addEventListener("click", actions.onDelete);
  }

  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}
