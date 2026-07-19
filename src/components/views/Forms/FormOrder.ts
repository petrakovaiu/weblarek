import { Form } from "./Form";
import type { IFormOrder } from "../../../types";
import type { IEvents } from "../../../components/base/Events";

export class FormOrder extends Form<IFormOrder> {
  private paymentButtons: HTMLButtonElement[];
  private addressInput: HTMLInputElement;

  constructor(
    container: HTMLElement,
    private events: IEvents,
  ) {
    super(container);

    this.paymentButtons = Array.from(container.querySelectorAll(".button_alt"));

    this.addressInput = container.querySelector("input[name='address']")!;

    this.paymentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.paymentButtons.forEach((item) =>
          item.classList.remove("button_alt-active"),
        );

        button.classList.add("button_alt-active");

        this.events.emit("order:payment", button.name);
      });
    });

    this.addressInput.addEventListener("input", () => {
      this.events.emit("order:change", {
        field: "address",
        value: this.addressInput.value,
      });
    });
  }

  protected onSubmit() {
    this.events.emit("order:submit");
  }
}
