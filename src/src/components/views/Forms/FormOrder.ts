import { Form } from "./Form";
import type { IFormOrder, TPayment } from "../../../types";
import type { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";

export class FormOrder extends Form<IFormOrder> {
  private readonly paymentButtons: HTMLButtonElement[];
  private readonly addressInput: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, () => events.emit("order:submit"));

    this.paymentButtons = Array.from(
      container.querySelectorAll<HTMLButtonElement>(".button_alt"),
    );
    this.addressInput = ensureElement<HTMLInputElement>(
      "input[name='address']",
      container,
    );

    this.paymentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        events.emit("order:payment", { payment: button.name as TPayment });
      });
    });

    this.addressInput.addEventListener("input", () => {
      events.emit("order:change", {
        field: "address",
        value: this.addressInput.value,
      });
    });
  }

  set payment(value: TPayment | null) {
    this.paymentButtons.forEach((button) => {
      button.classList.toggle("button_alt-active", button.name === value);
    });
  }

  set address(value: string) {
    this.addressInput.value = value;
  }
}
