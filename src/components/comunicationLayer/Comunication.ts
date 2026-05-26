import { IApi } from "../../types/index.ts";
import { ProductsApi } from "../../types/index.ts";
import { PostData } from "../../types/index.ts";
import { IOrder } from "../../types/index.ts";
import { IComunication } from "../../types/index.ts";

export class Comunication implements IComunication {
    api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProducts(): Promise<ProductsApi> {
        return this.api.get("/product");
    }

    postProduct(byer: PostData): Promise<IOrder> {
        return this.api.post<IOrder>("/order", byer);
    }
}
