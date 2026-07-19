import { Component } from "../base/Component";

export interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  private closeButton: HTMLButtonElement;
  private contentElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.closeButton = container.querySelector(".modal__close")!;

    this.contentElement = container.querySelector(".modal__content")!;

    this.closeButton.addEventListener("click", () => {
      this.close();
    });
  }

  open() {
    this.container.classList.add("modal_active");
  }

  close() {
    this.container.classList.remove("modal_active");
  }

  set content(value: HTMLElement) {
    this.contentElement.replaceChildren(value);
  }
}
