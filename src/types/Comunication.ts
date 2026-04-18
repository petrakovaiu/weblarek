import  { IApi, IBuyer, IProduct } from './index.ts';

type Total = number;

interface ApiResponse {
    items: IProduct[];
    total: Total;
}

interface PostData extends IBuyer, ApiResponse {
}

export class Comunication {
    api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProduct(uri: string): Promise<ApiResponse> { 
        return this.api.get(uri);
    }

    postProduct(uri: string, byerData: PostData): Promise<IProduct> { 
        return this.api.post<IProduct>(uri, byerData);
    }
}