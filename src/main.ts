import './scss/styles.scss';
import { Shop } from './types/Shop.ts';
import { Cart } from './types/Cart.ts';
import { Buyer } from './types/Buyer.ts';
import { API_URL } from './utils/constants.ts';

import { IApi } from './types/index.ts';
import { Api } from './components/base/Api.ts';
import { Comunication } from './types/Comunication.ts';

import { apiProducts } from './utils/data.ts';

const buyer = new Buyer();
buyer.setData({
    payment: 'card',
    address: 'Pyatigorsk, Kalinina 156/2',
    email: 'test@test.com',
    phone: '+71234567890'
});

console.log('Валидация поля:', buyer.validateField('payment'));

console.log('Валидация всех данных:', buyer.validateAll());

console.log('Получить объект покупателя', buyer.getData())

//'очистить данные покупателя', 
buyer.clearData()

console.log('Получить объект покупателя - проверка очистки данных', buyer.getData())

// Получение всех товаров в корзине
const cart = new Cart;
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

const apiInstance: IApi = new Api(API_URL);
const comunicationInstance = new Comunication(apiInstance);

//Тест методов каталога
//Запрос всех товаров в магазине
comunicationInstance.getProduct('/product/').then((res) => {
    const productsModel = new Shop();
    productsModel.setItems(res.items);
    console.log('Массив товаров из каталога: ', productsModel.getItems());
})
.catch(error => {
    console.error('Ошибка получения товаров:', error)
});

//Найти товар по ID
comunicationInstance.getProduct('/product/').then((res) => {
    const productsModel = new Shop();
    productsModel.setItems(res.items);
    console.log('Выбранный товар из каталога: ', productsModel.getItemById('854cef69-976d-4c2a-a18c-2aa45046c390'));
})
.catch(error => {
    console.error('Ошибка получения товара:', error)
});

//Запрос товара для подробного отображения.
comunicationInstance.getSelectedProduct('/product/854cef69-976d-4c2a-a18c-2aa45046c390').then((res) => {
    const productsModel = new Shop();
    productsModel.setSelectedItem(res);
    console.log('Запрос товара для подробного отображения: ', productsModel.getSelectedItem());
})
.catch(error => {
    console.error('Ошибка получения выбранного товара:', error)
});