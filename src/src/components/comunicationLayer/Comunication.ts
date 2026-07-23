import type {
  IApi,
  IComunication,
  IOrder,
  PostData,
  ProductsApi,
} from "../../types";

export class Comunication implements IComunication {
  constructor(private readonly api: IApi) {}

  getProducts(): Promise<ProductsApi> {
    return this.api.get<ProductsApi>("/product");
  }

  postProduct(buyer: PostData): Promise<IOrder> {
    return this.api.post<IOrder>("/order", buyer);
  }
}
