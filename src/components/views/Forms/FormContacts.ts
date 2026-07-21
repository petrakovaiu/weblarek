import { Form } from "./Form";
import type { IFormContacts } from "../../../types";
import type { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";

export class FormContacts extends Form<IFormContacts> {
  private readonly emailInput: HTMLInputElement;
  private readonly phoneInput: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, () => events.emit("contacts:submit"));

    this.emailInput = ensureElement<HTMLInputElement>(
      "input[name='email']",
      container,
    );
    this.phoneInput = ensureElement<HTMLInputElement>(
      "input[name='phone']",
      container,
    );

    this.emailInput.addEventListener("input", () => {
      events.emit("contacts:change", {
        field: "email",
        value: this.emailInput.value,
      });
    });

    this.phoneInput.addEventListener("input", () => {
      events.emit("contacts:change", {
        field: "phone",
        value: this.phoneInput.value,
      });
    });
  }

  set email(value: string) {
    this.emailInput.value = value;
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  }
}
