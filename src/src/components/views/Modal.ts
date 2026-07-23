import { Component } from "../base/Component";
import type { IModal } from "../../types";
import { ensureElement } from "../../utils/utils";

export class Modal extends Component<IModal> {
  private readonly closeButton: HTMLButtonElement;
  private readonly contentElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.closeButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      container,
    );
    this.contentElement = ensureElement<HTMLElement>(
      ".modal__content",
      container,
    );

    this.closeButton.addEventListener("click", () => this.close());
    this.container.addEventListener("click", (event) => {
      if (event.target === this.container) {
        this.close();
      }
    });
  }

  open(): void {
    this.container.classList.add("modal_active");
  }

  close(): void {
    this.container.classList.remove("modal_active");
  }

  set content(value: HTMLElement) {
    this.contentElement.replaceChildren(value);
  }
}
