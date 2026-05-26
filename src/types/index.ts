export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'card' | 'cash';

type Total = number;
export interface ProductsApi {
    items: IProduct[];
    total: Total;
}

export interface IOrder extends IBuyer {
    total: Total;
    id: string;
}

export interface PostData extends IBuyer {
    total: Total;
    items: string[];
}

//Тип для проверки для валидации
export type isValid = string[] | boolean;

//Товар:
export interface IProduct {
    id: string;
    description: string;
    title: string;
    image: string;
    category: string;
    price: number | null;
}

//Покупатель:
export interface BuyerData {
    payment: TPayment | null;
    address: string;
    email: string;
    phone: string;
}

export interface IBuyer {
    _data: BuyerData;
    setData(newData: BuyerData): void;
    getData(): BuyerData;
    clearData(): void;
    validate(): isValid;
}

//Корзина
export interface ICart {
    _itemsInCart: IProduct[];
    getItems(): IProduct[];
    addItem(item: IProduct): void;
    removeItem(itemId: string): void;
    clearCart(): void;
    getTotalCost(): number;
    getCount(): number;
    hasProduct(itemId: string): boolean;
}

//Каталог товаров
export interface IShop {
    _items: IProduct[];
    _item: IProduct | null;
    setItems(items: IProduct[]): void;
    getItems(): IProduct[];
    getItemById(id: string): IProduct | undefined;
    setSelectedItem(_item: IProduct): void;
    getSelectedItem(): IProduct | null;
}

export interface IComunication {
    api: IApi;
    getProducts(): Promise<ProductsApi>;
    postProduct(byer: PostData): Promise<IOrder>;
}
