import "./scss/styles.scss";
import { Shop } from "./components/models/Shop.ts";
import { Cart } from "./components/models/Cart.ts";
import { Buyer } from "./components/models/Buyer.ts";
import { API_URL } from "./utils/constants.ts";
import { IApi } from "./types/index.ts";
import { Api } from "./components/base/Api.ts";
import { Comunication } from "./components/comunicationLayer/Comunication.ts";
import { apiProducts } from "./utils/data.ts";
import { Header } from "./components/views/Header.ts";
// import type { IHeader } from "./types/index.ts";
import { EventEmitter } from "./components/base/Events.ts";

const events = new EventEmitter();

const buyer = new Buyer();
const cart = new Cart(events);
const productsModel = new Shop();

//Проверка модуля покупателя
buyer.setData({
  payment: "card",
  address: "Pushkina blvd, Kolotushkina str., Apt 10",
  email: "test@test.com",
  phone: "+71234567890",
});
console.log("Получить объект покупателя", buyer.getData());
buyer.clearData();
console.log(
  "Получить объект покупателя - проверка очистки данных",
  buyer.getData(),
);
console.log("Валидация покупателя:", buyer.validate());

// Получение товара из моковых данных
const item1 = apiProducts.items[0];
const item2 = apiProducts.items[1];
// Добавление товаров в корзину
cart.addItem(item1);
cart.addItem(item2);
// Получение всех товаров в корзине
console.log("Все товары в корзине:", cart.getItems());
// Общая стоимость корзины
console.log("Cтоимость корзины:", cart.getTotalCost());
//Количество товаров
console.log("Количество getCount():", cart.getCount());
// Проверка наличия товара по id
console.log(
  "Найденный товар",
  cart.hasProduct("854cef69-976d-4c2a-a18c-2aa45046c390"),
);
// Удаление товара по id (удалили item 1)
cart.removeItem("854cef69-976d-4c2a-a18c-2aa45046c390");
// Получение всех товаров в корзине, остался item2
console.log("Все товары в корзине:", cart.getItems());
// Очистка корзины
cart.clearCart();
// Пустая корзина
console.log("Все товары в корзине - после очистки:", cart.getItems());

//Методы для каталога товаров
const data = apiProducts.items;
productsModel.setItems(data);
console.log("Массив товаров из каталога: ", productsModel.getItems());
console.log(
  "Выбранный товар из каталога: ",
  productsModel.getItemById("854cef69-976d-4c2a-a18c-2aa45046c390"),
);
productsModel.setSelectedItem(item1);
console.log(
  "Метод для подробного отображения товара: ",
  productsModel.getSelectedItem(),
);

// Запрос всех товаров в магазине
const apiInstance: IApi = new Api(API_URL);
const comunicationInstance = new Comunication(apiInstance);
let res = comunicationInstance
  .getProducts()
  .then((res) => {
    productsModel.setItems(res.items);
    console.log("Массив товаров из каталога: ", res.items);
  })
  .catch((error) => {
    console.error("Ошибка получения товаров:", error);
  });

//проверка слоя Отоббражения

// Добавляем товары в корзину
// test-header.ts
// ============================================
// ПОДХОД 1: С сеттером
// ============================================
console.log("🧪 ПОДХОД 1: С сеттером");

const container1 = document.querySelector(".header")!;
// document.createElement("header");
// container1.innerHTML =
// // `<button class="header__basket">Корзина</button>
// //     <span class="header__basket-counter">0</span>
// // `;

const header = new Header(container1, events);

//Презентер (зайчатки):

// Инициализация - используем render

// // Частое обновление только счетчика - используем update
// events.on("cart:changed", (data: { counter: number }) => {
//   header.update({ counter: data.counter }); // Быстро и эффективно
// });

export function cartPresenter(
  cart: Cart,
  header: Header,
  events: EventEmitter,
): void {
  // Обновление счетчика корзины
  const updateCounter = () => {
    header.counter = cart.getCount();
  };

  // Добавление товара в корзину
  events.on("cart:change", (item) => {
    cart.addItem(item);
    updateCounter();
  });

  // Удаление товара
  events.on("cart:remove", (id: string) => {
    cart.removeItem(id);
    updateCounter();
  });

  // Очистка корзины
  events.on("cart:clear", () => {
    cart.clearCart();
    updateCounter();
  });

  // Открытие корзины
  events.on("basket:open", () => {
    const items = cart.getItems();

    events.emit("cart:render", {
      items,
      total: cart.getTotalCost(),
    });
  });

  // Первичная установка счетчика
  updateCounter();
}

cartPresenter(cart, header, events);
