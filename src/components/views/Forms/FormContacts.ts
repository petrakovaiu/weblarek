import { Form } from "./Form";
import type { IFormContacts } from "../../../types";
import type { IEvents } from "../../../components/base/Events";

export class FormContacts extends Form<IFormContacts> {
  private inputs: NodeListOf<HTMLInputElement>;

  constructor(
    container: HTMLElement,
    private events: IEvents,
  ) {
    super(container);

    this.inputs = container.querySelectorAll("input");

    this.inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this.events.emit("contacts:change", {
          field: input.name,
          value: input.value,
        });
      });
    });
  }

  protected onSubmit() {
    this.events.emit("contacts:submit");
  }
}
