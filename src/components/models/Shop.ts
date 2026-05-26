import type { IProduct } from '../../types/index.ts';
import type { IShop } from '../../types/index.ts';

export class Shop implements IShop {
    _items: IProduct[] = [];
    _item: IProduct | null = null;

    //Созранение всех товаров в магазине
    setItems(items: IProduct[]): void {
        this._items = items;
    }
    //Получение всех товаров в магазине
    getItems(): IProduct[] {
        return this._items;
    }
    //Найти товар по ID
    getItemById(id: string): IProduct | undefined {
        return this._items.find(product => product.id === id);
    }
    //Cохранение товара для подробного отображения;
    setSelectedItem(_item: IProduct): void {
        this._item = _item;
    }
    //получение товара для подробного отображения.
    getSelectedItem(): IProduct | null {
        return this._item;
    }
}