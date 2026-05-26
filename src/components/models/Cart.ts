import type { IProduct } from "../../types/index.ts";
import type { ICart } from "../../types/index.ts";

export class Cart implements ICart {
    _itemsInCart: IProduct[] = [];

    // Получение всех товаров в корзине
    getItems(): IProduct[] {
        return this._itemsInCart;
    }

    // Добавление товара
    addItem(item: IProduct): void {
        this._itemsInCart.push(item);
    }

    // Удаление товара по id
    removeItem(itemId: string): void {
        this._itemsInCart = this._itemsInCart.filter((item) => item.id !== itemId);
    }

    // Очистка корзины
    clearCart(): void {
        this._itemsInCart = [];
    }

    // Общая стоимость
    getTotalCost(): number {
        return this._itemsInCart.reduce((sum, item) => {
            if (item.price != null &&
                item.price
            ) { // Проверка на null или undefined
                return sum + item.price;
            }
            return sum;
        }, 0);
    }

    // Количество товаров
    getCount(): number {
        return this._itemsInCart.length;
    }

    // Проверка наличия товара по id
    hasProduct(itemId: string): boolean {
        return this._itemsInCart.some((item) => item.id === itemId);
    }
}
