import type { IProduct } from './index.ts';



export class Shop {
    items!: IProduct[];
    itemId!: IProduct['id'];
    currentItem!: IProduct;


    setItems(items: IProduct[]): void  {
        this.items = items;
    }

    getItems(): IProduct[] {
        return this.items;
    }

    getItemById(itemId: IProduct['id']): void {
        const products = this.items
        // const item = products.find(el => el.id === itemId);
        // return item ?? console.error('item does not exist')
    }

    // setCertainItem(certainItem): [] {
    //     items = items[0];
    // }

}


