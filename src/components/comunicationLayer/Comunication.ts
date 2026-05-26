import  { IApi, IProduct } from '../../types/index.ts';
import  { ProductsApi } from '../../types/index.ts';

export class Comunication {
    api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProducts(uri: string): Promise<ProductsApi> { 
        return this.api.get(uri);
    }

    getSelectedProduct(uri: string): Promise<IProduct> { 
        return this.api.get(uri);
    }

    postProduct(uri: string, byerData: ProductsApi): Promise<IProduct> { 
        return this.api.post<IProduct>(uri, byerData);
    }
}