import { IGallery } from "../../types/index.ts";
import { Component } from "../base/Component.ts";
import type { IEvents } from "../base/Events.ts";
import { ensureElement } from "../../utils/utils.ts";

export class Gallery extends Component<IGallery> {
  catalogElement: HTMLElement;
  events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    this.catalogElement = ensureElement<HTMLElement>(
      ".gallery",
      this.container,
    );
    this.catalogElement.addEventListener("click", () => {
      this.events.emit("modal:open");
    });
  }

  set catalog(items: HTMLElement[]) {
    if (this.catalogElement) {
      items.forEach((item) => {
        this.catalogElement.append(item);
      });
    }
  }
}
