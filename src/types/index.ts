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

//Товар:
export interface IProduct {
  id: string;
  description: string;
  title: string;
  image: string;
  category: string;
  price: number | null;
}

export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

//Покупатель:
export interface IBuyer {
  payment: TPayment | null;
  address: string;
  email: string;
  phone: string;
}

export interface IComunication {
  api: IApi;
  getProducts(): Promise<ProductsApi>;
  postProduct(byer: PostData): Promise<IOrder>;
}

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
  content: HTMLElement;
}

export interface IBasket {
  counter: number;
  isEmpty: boolean;
}

export interface ICard {
  title: string;
  price: string;
}

export interface ICardBasket {
  counter: number;
}

export interface ICardGallery {
  category: string;
  image: string;
}

export interface ICardPreview {
  category: string;
  image: string;
  description: string;
}

export interface IForm {
  errors: string;
}

export interface IFormOrder<T extends Partial<Record<keyof IBuyer, string>>> {}

export interface IFormContacts<
  T extends Partial<Record<keyof IBuyer, string>>,
> {}
