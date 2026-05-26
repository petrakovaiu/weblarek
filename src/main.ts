import './scss/styles.scss';
import { Shop } from './components/models/Shop.ts';
import { Cart } from './components/models/Cart.ts';
import { Buyer } from './components/models/Buyer.ts';
import { API_URL } from './utils/constants.ts';

import { IApi } from './types/index.ts';
import { Api } from './components/base/Api.ts';
import { Comunication } from './components/comunicationLayer/Comunication.ts';

import { apiProducts } from './utils/data.ts';

const buyer = new Buyer();
const cart = new Cart;
const productsModel = new Shop();

//Проверка модуля покупателя
buyer.setData({
    payment: 'card',
    address: 'Pushkina blvd, Kolotushkina str., Apt 10',
    email: 'test@test.com',
    phone: '+71234567890'
});
console.log('Валидация покупателя:', buyer.validate());
console.log('Получить объект покупателя', buyer.getData())
buyer.clearData()
console.log('Получить объект покупателя - проверка очистки данных', buyer.getData())

// Получение товара из моковых данных
const item1 = apiProducts.items[0];
const item2 = apiProducts.items[1];
// Добавление товаров в корзину
cart.addItem(item1);
cart.addItem(item2);
// Получение всех товаров в корзине
console.log('Все товары в корзине:', cart.getItems())
// Общая стоимость корзины
console.log('Cтоимость корзины:', cart.getTotalCost())
//Количество товаров
console.log('Количество getCount():', cart.getTotalCost())
// Проверка наличия товара по id
console.log('Найденный товар', cart.hasProduct('854cef69-976d-4c2a-a18c-2aa45046c390'))
// Удаление товара по id (удалили item 1)
cart.removeItem('854cef69-976d-4c2a-a18c-2aa45046c390')
// Получение всех товаров в корзине, остался item2
console.log('Все товары в корзине:', cart.getItems())
// Очистка корзины
cart.clearCart()
// Пустая корзина
console.log('Все товары в корзине:', cart.getItems())

//Методы для каталога товаров
const data = apiProducts.items;
productsModel.setItems(data)
console.log('Массив товаров из каталога: ', productsModel.getItems())
console.log('Выбранный товар из каталога: ', productsModel.getItemById('854cef69-976d-4c2a-a18c-2aa45046c390'))
productsModel.setSelectedItem(item1);
console.log('Метод для подробного отображения товара: ', productsModel.getSelectedItem());

// Запрос всех товаров в магазине
const apiInstance: IApi = new Api(API_URL);
const comunicationInstance = new Comunication(apiInstance);
const res = comunicationInstance.getProducts('/product/')
.then((res) => {
    productsModel.setItems(res);
    console.log('Массив товаров из каталога: ', res);
})
.catch(error => {
    console.error('Ошибка получения товаров:', error)
});