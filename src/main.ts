import './scss/styles.scss';
import { Shop } from './types/Shop.ts';
import { Cart } from './types/Cart.ts';
import { Buyer } from './types/Buyer.ts';
// import { Comunication } from './types/Comunication.ts';
import { API_URL } from './utils/constants.ts';

import { IApi } from './types/index.ts';
import { Api } from './components/base/Api.ts';
import { Comunication } from './types/index.ts';

import { apiProducts } from './utils/data.ts';

//const productsModel = new Buyer();
//productsModel.setItems(apiProducts.items);


const apiInstance: IApi = new Api(API_URL)
const comunicationInstance = new Comunication(apiInstance)

const productsModel = new Shop();
const response = comunicationInstance.getProduct().then(res: Promise<any>): [] => res.json();
productsModel.setItems(response);
//response.getItems()

console.log('Массив товаров из корзины: ', productsModel.getItems())

