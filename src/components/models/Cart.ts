import type { IProduct } from "../../types/index.ts";
import { IEvents } from "../../components/base/Events.ts";

export class Cart {
  private itemsInCart: IProduct[] = [];

  constructor(protected events: IEvents) {}
  // Получение всех товаров в корзине
  getItems(): IProduct[] {
    return this.itemsInCart;
  }

  // Добавление товара
  addItem(item: IProduct): void {
    this.itemsInCart.push(item);
    this.events.emit("cart:changed", { count: this.getCount() });
  }

  // Удаление товара по id
  removeItem(itemId: string): void {
    this.itemsInCart = this.itemsInCart.filter((item) => item.id !== itemId);
  }

  // Очистка корзины
  clearCart(): void {
    this.itemsInCart = [];
  }

  // Общая стоимость
  getTotalCost(): number {
    return this.itemsInCart.reduce((sum, item) => {
      if (item.price != null && item.price) {
        // Проверка на null или undefined
        return sum + item.price;
      }
      return sum;
    }, 0);
  }

  // Количество товаров
  getCount(): number {
    return this.itemsInCart.length;
  }

  // Проверка наличия товара по id
  hasProduct(itemId: string): boolean {
    return this.itemsInCart.some((item) => item.id === itemId);
  }
}
