import type { IBuyer, IBuyerModel } from "../../types";
import type { IEvents } from "../base/Events";

export class Buyer implements IBuyerModel {
  private data: IBuyer = {
    payment: null,
    address: "",
    email: "",
    phone: "",
  };

  constructor(private events: IEvents) {}

  setField<K extends keyof IBuyer>(field: K, value: IBuyer[K]): void {
    this.data = {
      ...this.data,
      [field]: value,
    };

    this.events.emit("buyer:changed", this.getData());
  }

  getData(): IBuyer {
    return {
      ...this.data,
    };
  }

  clear(): void {
    this.data = {
      payment: null,
      address: "",
      email: "",
      phone: "",
    };

    this.events.emit("buyer:changed", this.getData());
  }
}
