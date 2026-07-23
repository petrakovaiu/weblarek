import type { IGallery } from "../../types";
import { Component } from "../base/Component";

export class Gallery extends Component<IGallery> {
  private catalogElement: HTMLElement;
  constructor(container: HTMLElement) {
    super(container);
    this.catalogElement = this.container;
  }

  set catalog(items: HTMLElement[]) {
    this.catalogElement.replaceChildren(...items);
  }
}
