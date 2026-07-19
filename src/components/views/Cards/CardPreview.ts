import { Card } from "./Card";
import type { ICard } from "../../../types";
import type { IEvents } from "../../base/Events";
import { categoryMap } from "../../../utils/constants";

export class CardPreview extends Card<ICard> {
  private categoryElement: HTMLElement;
  private imageElement: HTMLImageElement;
  private descriptionElement: HTMLElement;
  private buttonElement: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    private events: IEvents,
  ) {
    super(container);

    this.categoryElement = container.querySelector(".card__category")!;

    this.imageElement = container.querySelector(".card__image")!;

    this.descriptionElement = container.querySelector(".card__text")!;

    this.buttonElement = container.querySelector(".card__button")!;

    this.buttonElement.addEventListener("click", () => {
      this.events.emit("cart:add");
    });
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    this.categoryElement.className = `card__category ${categoryMap[value]}`;
  }

  set image(value: string) {
    this.imageElement.src = value;
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }
}
