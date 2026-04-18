import type { IProduct } from './index.ts';

export class Shop {
    private items: IProduct[] = [];
    private item: IProduct = {
        id: '',
        description: '',
        title: '',
        image: '',
        category: '',
        price: null
    };

    setItems(items: IProduct[]): void  {
        this.items = items;
    }

    getItems(): IProduct[] {
        return this.items;
    }

    getItemById(id: string): IProduct | undefined {
        return this.items.find(product => product.id === id);
    }

    setSelectedItem(item: IProduct): void {
        this.item = item;
    }

    getSelectedItem(): IProduct {
        return this.item;
    }
}


