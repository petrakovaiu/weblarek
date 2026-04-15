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

// const productsModel = new Shop();
// productsModel.setItems(apiProducts.items)
// console.log(productsModel);


const apiInstance: IApi = new Api(API_URL)
const comunicationInstance = new Comunication(apiInstance)
const productsModel = new Shop();

const res = comunicationInstance.getProduct()
productsModel.setItems(await res);
console.log('Массив товаров из корзины: ', productsModel.getItems())




