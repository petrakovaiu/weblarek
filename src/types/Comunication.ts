import  { IApi, IBuyer, IProduct } from './index.ts';

type Total = number;

interface ProductApi {
    items: IProduct[];
    total: Total;
}

export interface PostData extends IBuyer, ProductApi {
}

export class Comunication {
    api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProduct(uri: string): Promise<ProductApi> { 
        return this.api.get(uri);
    }

    getSelectedProduct(uri: string): Promise<IProduct> { 
        return this.api.get(uri);
    }

    postProduct(uri: string, byerData: PostData): Promise<IProduct> { 
        return this.api.post<IProduct>(uri, byerData);
    }
}