import { Card } from "./Card";
import type { ICard } from "../../../types";
import type { IEvents } from "../../base/Events";
import { categoryMap } from "../../../utils/constants";

export class CardGallery extends Card<ICard> {
  private categoryElement: HTMLElement;
  private imageElement: HTMLImageElement;

  constructor(
    container: HTMLElement,
    private events: IEvents,
  ) {
    super(container);

    this.categoryElement = container.querySelector(".card__category")!;

    this.imageElement = container.querySelector(".card__image")!;

    this.container.addEventListener("click", () => {
      this.events.emit("card:select", this);
    });
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    this.categoryElement.className = `card__category ${categoryMap[value]}`;
  }

  set image(value: string) {
    this.imageElement.src = value;
  }
}
