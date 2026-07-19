import type { IEvents } from "../../components/base/Events";

export class Buyer {
  private data = {
    payment: "",
    address: "",
    email: "",
    phone: "",
  };

  constructor(private events: IEvents) {}

  setField(field: string, value: string) {
    this.data = {
      ...this.data,
      [field]: value,
    };

    this.events.emit("buyer:changed", this.data);
  }

  getData() {
    return {
      ...this.data,
    };
  }

  clear() {
    this.data = {
      payment: "",
      address: "",
      email: "",
      phone: "",
    };
  }
}
