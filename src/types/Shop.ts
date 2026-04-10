import type { IProduct } from './index.ts';

export class Shop {
    items!: IProduct[];

    setItems(items: IProduct[]): void {
        this.items = items
    }

    getItems(): IProduct[] {
        return this.items
    }
    // async items(itemsList: IApi) {
    //     await {{baseUrl}}/product/.json().toArray();
    // }
}


