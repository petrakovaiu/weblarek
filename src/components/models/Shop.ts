import type { IProduct } from "../../types";
import type { IEvents } from "../../components/base/Events";

export class Shop {
  private items: IProduct[] = [];

  constructor(private events: IEvents) {}

  setItems(items: IProduct[]) {
    this.items = items;

    this.events.emit("catalog:changed");
  }

  getItems() {
    return [...this.items];
  }

  getProduct(id: string) {
    return this.items.find((item) => item.id === id);
  }
}
