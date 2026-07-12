# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```

## Сборка

```
npm run build
```

или

```
yarn build
```

# Интернет-магазин «Web-Larёk»

«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component

Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`

#### Класс Api

Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter

Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` - хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

##### Данные

В ходе анализа проекта было установлено: в приложении используются две сущности, которые описывают данные, — товар и покупатель.

Товар:
interface IProduct {
id: string;
desription: string;
title: string;
image: string;
category: string;
price: number | null;
}

Покупатель:
interface IBuyer {
payment: TPayment;
'card' | 'cash' | null
address: string,
email: string,
phone: string.
}

###### Модели данных

Для учёта данных в приложении должны быть 3 сущности -- класса, -- которые будут разделены между собой по смыслу и зонам ответственности:
1 - Каталог на главной.
Отвечает за хранение товаров, которые можно купить в приложении;
2 - Корзина с товарами.
хранение товаров, которые пользователь выбрал для покупки;
3 - Покупатель.
данные покупателя, которые тот должен указать при оформлении заказа.

Каталог и корзина используют интерфейс IProduct. Покупатель - интерфейс IBuyer.

Каталог товаров:
`export class Shop {}` - хранит массив всех товаров и товар, выбранный для подробного отображения;
Содержит поля, используемые внутри класса:
`items: IProduct[]`; - хранит массив товаров в магазине.
`item: IProduct | null`; - хранит товар для подробного отображения(по умолчанию пустой).
Содержит методы:
`setItems(items: IProduct[]): void` - сохранение массива товаров полученного в параметрах метода;
`getItems(): IProduct[]` - получение массива товаров из модели;
`getItemById(id: string): IProduct | undefined` - получение одного товара по его id;
`setSelectedItem(_item: IProduct): void` - сохранение товара для подробного отображения;
`getSelectedItem(): IProduct | null` - получение товара для подробного отображения.

Корзина:
`export class Cart` хранит массив товаров, выбранных покупателем для покупки.
Содержит поля, используемые внутри класса:
`itemsInCart: IProduct[] = [];` - поле для хранения товаров.
Методы:
`getItems(): IProduct[]` - получение массива товаров, которые находятся в корзине;
`addItem(item: IProduct): void` - добавление товара, который был получен в параметре, в массив корзины;
`removeItem(itemId: string): void` - удаление товара, полученного в параметре из массива корзины;
`clearCart(): void` - очистка корзины;
`getTotalCost(): number` - получение стоимости всех товаров в корзине;
`getCount(): number` - получение количества товаров в корзине;
`hasProduct(itemId: string): boolean` - проверка наличия товара в корзине по его id, полученного в параметр метода.

Покупатель:
`export class Buyer {}`
Внутри поля инициализирован объект cо следующими данными:
`_data: BuyerData = {`
`payment: null` - вид оплаты;
`address: ""` - адреc;
`email: ""` - телефон;
`phone: ""` - email.
`};`

Методы класса Buyer:
`setData(newData: BuyerData): void` - общий метод сохранения данных в модели. В котором реализована возможность сохранить только одно значение, например, только адрес или только телефон, не удалив при этом значения других полей, которые уже могут храниться в классе;
`getData(): BuyerData` - получение всех данных покупателя;
`clearData(): void` - очистка данных покупателя;
`validate(): TBuyerErrors` - валидация полей. Метод создает и возвращает объект `errors` типа `TBuyerErrors = Partial<Record<keyof IBuyer, string>>`, где ключи -- названия полей `IBuyer`;
Каждое поле проверяется на валидность функцией `notValid`, если условие не удовлетворено, объекту присваивается ключ, с текстом ошибки в значении.

###### Слой коммуникации

`export class Comunication implements IComunication` - Класс слоя коммуникации для взаимодействия классов и API приложения. Экземпляр коммуникотивного слоя принимает объект, соответствующий интерфейсу IApi , что нужно для разделения логики:

Поле класса:
`apiData: IApi;` - данные с сервера;

Конструктор:
`constructor(apiData: IApi)` - принимает данные с сервера;

Методы класса:
`getProducts(): Promise<ProductsApi>` - Нужен для get запроса на эндпоинт /product/ и возвращает объект, полученный от сервера, в котором находится массив товаров
`postProduct(uri: string, byerData: PostData): Promise<IProduct>` - Метод делает post запрос на эндпоинт /order/ и передаёт в него данные, полученные в параметрах метода, а возвращает объект, подтверждающий покупку на определенную сумму.

###### Слой представления

Шапка:

<!-- Интерфейс `HeaderData`
поля:
`basketButton: HTMLButtonElement` - кнопка корзина;
`counter: number` - счетчик количества товаров в корзине. -->

`export class Header`
`private basketButton: HTMLButtonElement`- элемент с кнопкой корзины
`private counterElement: HTMLElement` - элемент, где отображается счетчик корзины
`set counter (value: number)` - метод принимает и сохраняет значение счетчика корзины

`export class Gallery`
`private catalogElement: HTMLElement[]` - карточки в галлерее
`set catalog (items: HTMLElement[])` - принимает массив карточек

`export class Modal`
`private contentElement: HTMLElement` - содержимое модального окна
`private modalButton: HTMLButtonElement`- кнопка модального окна
`set content (content: HTMLElement)` - метод принимает контент модалки

`export class Success`
`private totalCostElement: HTMLElement` - контент с подтверждением покупки и кол-вом списанных синапсов
`private acceptButton: HTMLButtonElement`- кнопка "принять"
`set totalCost (value: number)` - метод принимает контент количество списанных синапсов

`export class Basket`
`private isEmptyElement?: HTMLParagraphElement` - поле для контента внутри корзины по умолчанию (пустая корзина)
`private cardList: HTMLLIElement[]` - список карточек
`private basketButton: HTMLButtonElement`- кнопка "оформить"
`private totalCostElement: HTMLParagraphElement` - кол-во списанных синапсов
`set totalCost (value: number)` - метод принимает контент количество списанных синапсов
`set content (iems: HTMLLIElement[])` - метод принимает список карточек

`export absctract class Card` Является базовым классом для всех компонентов карточек в приложении
`private titleElement: HTMLSpanElement`- название товара
`private priceElement: HTMLSpanElement` - кол-во списанных синапсов
`set title (title: string)` - метод принимает строку название товара
`set price (value: TPayment)` - метод принимает числовое значение, цену

`export class CardBasket` Элемент списка для корзины
`private indexElement: HTMLSpanElement` - порядковый номер
`private totalCostElement: HTMLSpanElement` - итоговая стоимость товаров в корзине
`private deleteButton: HTMLButtonElement` - удалить товар из корзины
`set index (value: number)` - метод принимает индекс товара
`set totalCost (value: number)` - метож принимает итоговая стоимость товаров в корзине

`export class CardCatalog` Элемент списка для каталога
`private categoryElement: HTMLSpanElement` - категория
`private imageElement: HTMLImgElement` - изображение товара
`set category (category: string)` - метод принимает индекс товара
`set image (url: string)` - метод принимает ссылку на изображение товара

`export class CardPreview` Превью карточки
`private categoryElement: HTMLSpanElement` - категория
`private imageElement: HTMLImgElement` - изображение товара
`private descriptionElement: HTMLSpanElement` - описание товара
`private addDeleteButton: HTMLButtonElement` - добавить/удалить товар из корзины toggleButton
`set category (category: string)` - метод принимает индекс товара
`set image (url: string)` - метод принимает ссылку на изображение товара
`set description (url: string)` - метод принимает описание товара

`export abstract class Form` Является базовым классом для форм приложения
`private errorsElement?: HTMLSpanElement` - ошибки, возникающие в форме, опциональное поле
`set errors (url: string)` - метод принимает описание товара и добавляет ошибку в `<span>`, если есть

`export class FormOrder` форма заказа
`private paymentElement: HTMLButtonElement[]` - кнопки для оплаты
`private addressElement: HTMLInputElement` - адрес доставки
`private forwardButton: HTMLButtonElement` - кнопка "далее", доступна после корректного заполнения формы
`set payment (value: TPayment)` - метод принимает вид оплаты, выбранный пользователем
`set address (value: string)` - метод принимает строку с адресом

`export class FormOrder` форма контактов
`private emailElement: HTMLInputElement` - почта пользователя
`private phoneElement: HTMLInputElement` - телефон
`private submitButton: HTMLButtonElement` - кнопка подтверждения заказа, доступна после корректного заполнения формы
`set email (value: string)` - метод принимает электронную почту
`set phone (value: string)` - метод принимает номер телефона

###### События
