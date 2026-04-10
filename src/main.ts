import './scss/styles.scss';
import { Shop } from './types/Shop.ts';
import { Cart } from './types/Cart.ts';
import { Buyer } from './types/Buyer.ts';
// import { Comunication } from './types/Comunication.ts';

import { IApi } from './types/index.ts';
import { Comunication } from './types/index.ts';

import { apiProducts } from './utils/data.ts';

const productsModel = new Buyer();
productsModel.setItems(apiProducts.items);

console.log('Массив товаров из корзины: ', productsModel.getItems())

const apiInstance = new Comunication('http://localhost:3000/api/weblarek')
apiInstance.getProduct();

