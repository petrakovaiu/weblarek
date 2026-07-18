import { IModal } from "../../types/index.ts";
import { Component } from "../base/Component.ts";
import type { IEvents } from "../base/Events.ts";

import { ensureElement } from "../../utils/utils.ts";

export class Modal extends Component<IModal> {
  events: IEvents;
  private contentElement: HTMLElement;
  private modalButton: HTMLButtonElement;
  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    this.contentElement = this.content;
    this.modalButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container,
    );
    this.modalButton.addEventListener("click", () => {
      this.events.emit("modal:close");
    });
  }
  set content(content: HTMLElement) {
    this.contentElement.appendChild(content);
  }
}
