import { Component } from "../../base/Component";
import type { IForm } from "../../../types";
import { ensureElement } from "../../../utils/utils";

export abstract class Form<T extends IForm = IForm> extends Component<T> {
  protected readonly submitButton: HTMLButtonElement;
  protected readonly errorsElement: HTMLElement;

  protected constructor(container: HTMLFormElement, onSubmit: () => void) {
    super(container);
    this.submitButton = ensureElement<HTMLButtonElement>(
      "button[type='submit']",
      container,
    );
    this.errorsElement = ensureElement<HTMLElement>(".form__errors", container);

    container.addEventListener("submit", (event) => {
      event.preventDefault();
      onSubmit();
    });
  }

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }

  set errors(value: string) {
    this.errorsElement.textContent = value;
  }
}
