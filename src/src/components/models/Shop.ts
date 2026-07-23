import type { IProduct, IShopModel } from "../../types";
import type { IEvents } from "../base/Events";

export class Shop implements IShopModel {
  private items: IProduct[] = [];
  private selectedItem: IProduct | null = null;

  constructor(private events: IEvents) {}

  setItems(items: IProduct[]): void {
    this.items = items;

    this.events.emit("catalog:changed");
  }

  getItems(): IProduct[] {
    return [...this.items];
  }

  getProduct(id: string): IProduct | undefined {
    return this.items.find((item) => item.id === id);
  }

  setSelectedItem(item: IProduct): void {
    this.selectedItem = item;

    this.events.emit("product:selected");
  }

  getSelectedItem(): IProduct | null {
    return this.selectedItem;
  }
}
