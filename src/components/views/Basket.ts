import { IBasket } from "../../types/index.ts";
import { Component } from "../base/Component.ts";
import type { IEvents } from "../base/Events.ts";
import { createElement } from "../../utils/utils.ts";
import { ensureElement } from "../../utils/utils.ts";
import { cloneTemplate } from "../../utils/utils.ts";
import { ICardBasket } from "../../types/index.ts";

export class Basket extends Component<IBasket> {
  private events: IEvents;
  private isEmptyElement?: HTMLParagraphElement;
  private cardList: HTMLElement[];
  private basketButton: HTMLButtonElement;
  private totalCostElement: HTMLParagraphElement;

  constructor(container: HTMLElement, card: ICardBasket, events: IEvents) {
    super(container);
    this.events = events;
    this.isEmptyElement = createElement<HTMLParagraphElement>("p");
    this.cardList = container.appendChild(
      cloneTemplate(createElement("li", card)),
    );
    this.basketButton = ensureElement<HTMLButtonElement>(
      ".button basket__button",
      this.container,
    );
    this.basketButton.addEventListener("click", () => {
      this.events.emit("modal:buy");
    });
  }
  set totalCost(value: number) {
    if (this.totalCostElement) {
      this.totalCostElement.textContent = `Списано ${value} синапсов`;
    }
  }

  set isEmpty(content: string) {}

  set totalCost(value: number) {}
}
