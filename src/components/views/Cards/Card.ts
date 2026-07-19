import { Component } from "../../base/Component";
import type { ICard } from "../../../types";

export abstract class Card<T extends ICard = ICard> extends Component<T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.titleElement = container.querySelector(".card__title")!;

    this.priceElement = container.querySelector(".card__price")!;
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  set price(value: string) {
    this.priceElement.textContent = value ? `${value} синапсов` : "Бесценно";
  }

  render(data?: Partial<T>): HTMLElement {
    super.render(data);

    return this.container;
  }
}
