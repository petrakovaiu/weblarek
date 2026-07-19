import { Component } from "../../base/Component";
import type { IForm } from "../../../types";

export abstract class Form<T extends IForm = IForm> extends Component<T> {
  protected submitButton: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container);

    this.submitButton = container.querySelector("button[type='submit']")!;

    this.container.addEventListener("submit", (event) => {
      event.preventDefault();
      this.onSubmit();
    });
  }

  protected onSubmit(): void {}

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }

  set errors(value: string) {
    const error = this.container.querySelector(".form__errors");

    if (error) {
      error.textContent = value;
    }
  }
}
