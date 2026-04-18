import './scss/styles.scss';
import { Shop } from './types/Shop.ts';

import { apiProducts } from './utils/data.ts';

const productsModel = new Shop();
productsModel.setItems(apiProducts.items)
console.log(productsModel);