import type { ICartModel, IProduct } from "../../types";
import type { IEvents } from "../base/Events";

export class Cart implements ICartModel {
  private items: IProduct[] = [];

  constructor(private events: IEvents) {}

  getItems(): IProduct[] {
    return [...this.items];
  }

  addItem(item: IProduct): void {
    this.items.push(item);

    this.events.emit("cart:changed", {
      count: this.items.length,
    });
  }

  removeItem(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);

    this.events.emit("cart:changed", {
      count: this.items.length,
    });
  }

  clearCart(): void {
    this.items = [];

    this.events.emit("cart:changed", {
      count: 0,
    });
  }

  getCount(): number {
    return this.items.length;
  }

  getTotalCost(): number {
    return this.items.reduce((sum, item) => sum + (item.price ?? 0), 0);
  }

  hasProduct(id: string): boolean {
    return this.items.some((item) => item.id === id);
  }
}
