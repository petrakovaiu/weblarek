import type { IProduct } from './index.ts';

export class Shop {
    private items: IProduct[];
    private item: IProduct | null;

    constructor() {
        this.items = [];
        this.item = null;
    }
    //Созранение всех товаров в магазине
    setItems(items: IProduct[]): void  {
        this.items = items;
    }
    //Получение всех товаров в магазине
    getItems(): IProduct[] {
        return this.items;
    }
    //Найти товар по ID
    getItemById(id: string): IProduct | undefined {
        return this.items.find(product => product.id === id);
    }
    //Cохранение товара для подробного отображения;
    setSelectedItem(item: IProduct): void {
        this.item = item;
    }
    //получение товара для подробного отображения.
    getSelectedItem(): IProduct | null {
        return this.item;
    }
}


