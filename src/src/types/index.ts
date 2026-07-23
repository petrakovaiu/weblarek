export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

export type TPayment = "card" | "cash";
export type Total = number;

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

export interface IProduct {
  id: string;
  description: string;
  title: string;
  image: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: TPayment | null;
  address: string;
  email: string;
  phone: string;
}

export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export interface IComunication {
  getProducts(): Promise<ProductsApi>;
  postProduct(buyer: PostData): Promise<IOrder>;
}

// Абстракции моделей для презентера
export interface IShopModel {
  setItems(items: IProduct[]): void;
  getItems(): IProduct[];
  getProduct(id: string): IProduct | undefined;
  setSelectedItem(item: IProduct): void;
  getSelectedItem(): IProduct | null;
}

export interface ICartModel {
  getItems(): IProduct[];
  addItem(item: IProduct): void;
  removeItem(id: string): void;
  clearCart(): void;
  getCount(): number;
  getTotalCost(): number;
  hasProduct(id: string): boolean;
}

export interface IBuyerModel {
  setData(data: Partial<IBuyer>): void;
  getData(): IBuyer;
  clearData(): void;
  validate(): TBuyerErrors;
}

// Данные представлений
export interface IHeader {
  counter: number;
}

export interface IGallery {
  catalog: HTMLElement[];
}

export interface IModal {
  content: HTMLElement;
}

export interface ISuccess {
  total: number;
}

export interface IBasket {
  items: HTMLElement[];
  total: number;
  valid: boolean;
}

export interface ICard {
  title: string;
  price: number | null;
}

export interface ICardBasket extends ICard {
  index: number;
}

export interface ICardGallery extends ICard {
  category: string;
  image: string;
}

export interface ICardPreview extends ICardGallery {
  description: string;
  buttonText: string;
  buttonDisabled: boolean;
}

export interface IForm {
  valid: boolean;
  errors: string;
}

export interface IFormOrder extends IForm {
  payment: TPayment | null;
  address: string;
}

export interface IFormContacts extends IForm {
  email: string;
  phone: string;
}

// Абстракции представлений для презентера
export interface IHeaderView {
  counter: number;
  render(data?: Partial<IHeader>): HTMLElement;
}

export interface IGalleryView {
  catalog: HTMLElement[];
  render(data?: Partial<IGallery>): HTMLElement;
}

export interface IBasketView {
  items: HTMLElement[];
  total: number;
  valid: boolean;
  render(data?: Partial<IBasket>): HTMLElement;
}

export interface IModalView {
  content: HTMLElement;
  open(): void;
  close(): void;
  render(data?: Partial<IModal>): HTMLElement;
}

export interface ISuccessView {
  total: number;
  render(data?: Partial<ISuccess>): HTMLElement;
}

export interface IFormOrderView {
  render(data?: Partial<IFormOrder>): HTMLElement;
}

export interface IFormContactsView {
  render(data?: Partial<IFormContacts>): HTMLElement;
}

export interface ICardPreviewView {
  render(data?: Partial<ICardPreview>): HTMLElement;
}

// Данные событий
export interface IProductIdEvent {
  id: string;
}

export interface IFormFieldEvent<K extends keyof IBuyer = keyof IBuyer> {
  field: K;
  value: IBuyer[K];
}

export type IBuyerChangedEvent = IBuyer;
