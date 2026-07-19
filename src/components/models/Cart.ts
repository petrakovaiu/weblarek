import type { IProduct } from "../../types";
import type { IEvents } from "../../components/base/Events";

export class Cart {
  private items: IProduct[] = [];

  constructor(private events: IEvents) {}

  getItems() {
    return [...this.items];
  }

  addItem(item: IProduct) {
    this.items.push(item);

    this.events.emit("cart:changed", {
      count: this.items.length,
    });
  }

  removeItem(id: string) {
    this.items = this.items.filter((item) => item.id !== id);

    this.events.emit("cart:changed", {
      count: this.items.length,
    });
  }

  clearCart() {
    this.items = [];

    this.events.emit("cart:changed", {
      count: 0,
    });
  }

  getCount() {
    return this.items.length;
  }

  getTotalCost() {
    return this.items.reduce((sum, item) => sum + (item.price ?? 0), 0);
  }

  hasProduct(id: string) {
    return this.items.some((item) => item.id === id);
  }
}
