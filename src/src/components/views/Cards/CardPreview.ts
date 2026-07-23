import { Card } from "./Card";
import type { ICardPreview } from "../../../types";
import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";

type CardPreviewActions = {
  onBuy: () => void;
};

export class CardPreview extends Card<ICardPreview> {
  private readonly categoryElement: HTMLElement;
  private readonly imageElement: HTMLImageElement;
  private readonly descriptionElement: HTMLElement;
  private readonly buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions: CardPreviewActions) {
    super(container);
    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      container,
    );
    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      container,
    );
    this.descriptionElement = ensureElement<HTMLElement>(
      ".card__text",
      container,
    );
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".card__button",
      container,
    );
    this.buttonElement.addEventListener("click", actions.onBuy);
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

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set buttonText(value: string) {
    this.buttonElement.textContent = value;
  }

  set buttonDisabled(value: boolean) {
    this.buttonElement.disabled = value;
  }
}
