export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'card' | 'cash' | null;

type Total = number;
export interface ProductsApi{
    items: IProduct[];
    total: Total;
}

export interface PostData extends IBuyer {
    total: Total;
    items: string[]
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
export interface IBuyer {
payment: TPayment;
address: string;
email: string;
phone: string;
}

