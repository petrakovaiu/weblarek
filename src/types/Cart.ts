import type { IProduct } from './index.ts';

export class Cart {
    items!: IProduct[];

    setItems(items: IProduct[]): void {
        this.items = items
    }

    getItems(): IProduct[] {
        return this.items
    }
}