import { Card } from "./Card";
import type { ICardGallery } from "../../../types";
import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";

type CardGalleryActions = {
  onClick: () => void;
};

export class CardGallery extends Card<ICardGallery> {
  private readonly categoryElement: HTMLElement;
  private readonly imageElement: HTMLImageElement;

  constructor(container: HTMLElement, actions: CardGalleryActions) {
    super(container);
    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      container,
    );
    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      container,
    );
    this.container.addEventListener("click", actions.onClick);
  }

  set category(value: string) {
    this.categoryElement.textContent = value;
    Object.values(categoryMap).forEach((className) =>
      this.categoryElement.classList.remove(className),
    );
    const categoryClass = categoryMap[value as keyof typeof categoryMap];
    if (categoryClass) this.categoryElement.classList.add(categoryClass);
  }

  set image(value: string) {
    this.setImage(
      this.imageElement,
      value,
      this.titleElement.textContent ?? "",
    );
  }
}
