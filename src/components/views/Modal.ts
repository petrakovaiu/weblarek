import { Component } from "../base/Component";
import type { IModal } from "../../types";
import { ensureElement } from "../../utils/utils";

type ModalActions = {
  onClose: () => void;
};

export class Modal extends Component<IModal> {
  private readonly closeButton: HTMLButtonElement;
  private readonly contentElement: HTMLElement;

  constructor(container: HTMLElement, actions: ModalActions) {
    super(container);
    this.closeButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      container,
    );
    this.contentElement = ensureElement<HTMLElement>(
      ".modal__content",
      container,
    );

    this.closeButton.addEventListener("click", actions.onClose);
    this.container.addEventListener("click", (event) => {
      if (event.target === this.container) actions.onClose();
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
