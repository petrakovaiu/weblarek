# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:

- src/ - исходные файлы проекта
- src/components/ - папка с JS компонентами
- src/components/base/ - папка с базовым кодом

Важные файлы:

- index.html - HTML-файл главной страницы
- src/types/index.ts - файл с типами
- src/main.ts - точка входа приложения
- src/scss/styles.scss - корневой файл стилей
- src/utils/constants.ts - файл с константами
- src/utils/utils.ts - файл с утилитами

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

«Web-Larёk» - это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

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

В ходе анализа проекта было установлено: в приложении используются две сущности, которые описывают данные, - товар и покупатель.

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
`export class Header extends Component<IHeader> `
Поля класса:
`private basketButton: HTMLButtonElement`- элемент с кнопкой корзины
`private counterElement: HTMLElement` - элемент, где отображается счетчик корзины
Конструктор:
`constructor( container: HTMLElement, private events: IEvents,)` - принимает сам элемент и события для работы с методами IEvents
`this.basketButton = ensureElement<HTMLButtonElement>` - получает один DOM-элемент кнопки корзины, содержит параметры:
`".header__basket"`, - селектор для кнопки корзины
`this.container,` - контекст для работы фунции
`his.counterElement = ensureElement<HTMLSpanElement>` - получает один DOM-элемент с счетчиком корзины, содержит параметры:
`".header__basket-counter"`, - селектор для счетчика корзины
`this.container,` - контекст для работы фунции
`this.basketButton.addEventListener` - слушатель кнопки, эмитит осбытие `"basket:open"` по клику
Сеттеры
`set counter (value: number)` - метод принимает и сохраняет значение счетчика корзины: `this.counterElement.textContent = String(value)`

Каталог товаров:
`export class Gallery`
Поля
`private catalogElement: HTMLElement` - HTML element для того, чтобы сохранить галлерею
Конструктор:
`constructor(container: HTMLElement)` - принимает сам элемент
`this.catalogElement = this.container` - элементу присваивается контейнер
Сеттеры:
`set catalog (items: HTMLElement[])` - принимает массив карточек
`this.catalogElement.replaceChildren(...items)` - spread-оператор распаковывает массив из презентера и помещает его в родительский элеменгт

Модальное окно:
`export class Modal`
Поля:
`private closeButton: HTMLButtonElement`- кнопка модального окна
`private contentElement: HTMLElement` - содержимое модального окна
Конструктор:
`constructor(container: HTMLElement, actions: ModalActions)` - принимает сам элемент и события для работы с методами IEvents
`this.closeButton = ensureElement<HTMLButtonElement>` - получает один DOM-элемент кнопки "закрыть", содержит параметры:
`".modal__close"` - селектор для кнопки "закрыть"
`container` - контекст для работы фунции
`this.contentElement = ensureElement<HTMLElement>`- получает один DOM-элемент контента модального окна, содержит параметры:
`".modal__content"` - селектор для содержимого окна
`container` - контекст для работы фунции
`this.closeButton.addEventListener` - слушатель кнопки "закрыть", вызывает колбэк из параметров конструктор во время создания образца класса
`this.container.addEventListener` - слушатель отслеживает место клика `event.target === this.container` и закроет модальное окно только если пользователь нажал именно на фон.
`set content (content: HTMLElement)` - метод принимает контент модалки
Методы
`open(): void` - открыть окно
`this.container.classList.add("modal_active")` - добавляет модификатор
`close(): void` - закрыть окно
`this.container.classList.remove("modal_active")` - убирает модификатор

Контент с подтверждением покупки и кол-вом списанных синапсов
`export class Success`
`private readonly descriptionElement` - Элемент с количеством списанных синапсов
`private readonly closeButton`- кнопка закрывает окно
Конструктор:
`this.descriptionElement = ensureElement<HTMLElement>` - получает один DOM-элемент с с количеством списанных синапсов, принимает
`".order-success__description"` - селектор для элемента с описанием итоговой суммы корзины
`container` - контекст для работы фунции
`this.closeButton = ensureElement<HTMLButtonElement>` - получает один DOM-элемент с кнопкой по которой окно закроется
`".order-success__close"` - селектор для элемента с кнопкой
`container` - контекст для работы фунции
`this.closeButton.addEventListener` - слушатель события для кнопки, по клику эмитит событие `"success:close"`
Сеттер:
`set totalCost (value: number)` - метод принимает контент количество списанных синапсов
`this.descriptionElement.textContent = `Списано ${value} синапсов`` - внутри элементу с описанием итоговой суммы корзины присваивается шаблонная строка c итоговым значением

Класс Basket отвечает за отображение корзины
`export class Basket extends Component<IBasket>`
Поля
`private readonly listElement: HTMLElement` - DOM-элемент списка
`private buttonElement: HTMLElement` - кнопка «Оформить».
`private priceElement: HTMLParagraphElement` - элемент для отображения общей стоимости товаров.
Конструктор
`constuctor(container: HTMLElement, events: IEvents)` - принимает корневой DOM-элемент корзины и экземпляр брокера событий.
`this.listElement = ensureElement<HTMLElement>` - получает DOM-элемент списка
Параметры:
`".basket__list"` - селектор списка;
`container` - контекст поиска элемента.
`this.buttonElement = ensureElement<HTMLButtonElement>` - получает DOM-элемент кнопки оформления заказа.
Параметры:
`".basket__button"` - селектор кнопки «Оформить»;
`container` - контекст поиска элемента.
`this.priceElement = ensureElement<HTMLParagraphElement>` - получает DOM-элемент с общей стоимостью заказа.
Параметры:
`".basket__price"` - селектор элемента итоговой стоимости;
`container` - контекст поиска элемента.
`this.basketButton.addEventListener("click", ...)` - устанавливает слушатель события для кнопки. При нажатии генерирует событие `"order:open"` через брокер событий.
Сеттеры:
`set total(value: number)` - принимает общую стоимость товаров и отображает её в элементе priceElement.
`this.priceElement.textContent = `${value} синапсов``;
`set items(items: HTMLLIElement[])`- принимает массив карточек товаров и отображает его в корзине:`this.listElement.replaceChildren(...items);`
`set valid(value: boolean)`- Проверка на наличие товаров. Если товары отсутствуют, кнопка оформления становится недоступной:`this.buttonElement.disabled = !value;`

Абстрактный базовый класс для всех компонентов карточек приложения.
`export abstract class Card<T extends ICard> extends Component<T>`
Поля
`protected titleElement: HTMLSpanElement` - элемент с названием товара.
`protected priceElement: HTMLSpanElement` - элемент со стоимостью товара.
Поля имеют модификатор protected, поскольку используются дочерними классами.
Конструктор
`constructor(container: HTMLElement)` - принимает корневой DOM-элемент карточки.
`this.titleElement = ensureElement<HTMLSpanElement>` - получает DOM-элемент с названием товара.
Параметры:
`".card__title"` - селектор названия товара;
`container` - контекст поиска элемента.
`this.priceElement = ensureElement<HTMLSpanElement>` - получает DOM-элемент со стоимостью товара.
Параметры:
`".card__price"` - селектор стоимости товара;
`container` - контекст поиска элемента.
Сеттеры
`set title(value: string)` - принимает название товара и отображает его в элементе titleElement.
`this.titleElement.textContent = value`;
`set price(value: number | null)` - принимает стоимость товара.
Если цена указана, элементу присваивается строка с количеством синапсов.
`this.priceElement.textContent = `${value} синапсов``;
Если цена отсутствует, отображается текст «Бесценно».

Класс CardGallery отвечает за отображение карточки товара в каталоге
`export class CardGallery extends Card<ICardGallery>` - Наследуется от абстрактного класса `Card`.
Поля
`private categoryElement: HTMLSpanElement` - элемент с категорией товара.
`private imageElement: HTMLImageElement` - изображение товара.
Конструктор
`constructor(container: HTMLElement, actions: ICardActions)` - принимает корневой DOM-элемент карточки и объект с обработчиками действий.
`this.categoryElement = ensureElement<HTMLSpanElement>` - получает DOM-элемент категории товара.
Параметры:
`".card__category"` - селектор категории;
`container` - контекст поиска элемента.
`this.imageElement = ensureElement<HTMLImageElement>` - получает DOM-элемент изображения товара.
Параметры:
`".card__image"` - селектор изображения;
`container` - контекст поиска элемента.
`this.container.addEventListener("click", actions.onClick)` - устанавливает слушатель события на всю карточку. При нажатии вызывается переданный обработчик выбора товара.
Обработчик, переданный из презентера, генерирует событие `"card:select"`.
Сеттеры
`set category(value: string)` - принимает категорию товара, отображает её и добавляет соответствующий CSS-модификатор из объекта categoryMap.
`set image(value: string)` - принимает URL изображения товара и передаёт его в метод `setImage`:
`this.setImage(`
`this.imageElement,`
`value,`
`this.titleElement.textContent ?? ""`
`)`;

Подробная информация о выбранном товаре в модальном окне.
`export class CardPreview extends Card<ICardPreview>` - Наследуется от абстрактного класса Card.
Поля
`private categoryElement: HTMLSpanElement` - элемент с категорией товара.
`private imageElement: HTMLImageElement` - изображение товара.
`private descriptionElement: HTMLParagraphElement` - элемент с описанием товара.
`private addDeleteButton: HTMLButtonElement` - кнопка добавления товара в корзину или удаления товара из корзины.
Конструктор
`constructor(container: HTMLElement, actions: ICardActions)` - принимает корневой DOM-элемент карточки и объект с обработчиками действий.
`this.categoryElement = ensureElement<HTMLSpanElement>` - получает DOM-элемент категории товара.
Параметры:
`".card__category"` - селектор категории;
`container` - контекст поиска элемента.
`this.imageElement = ensureElement<HTMLImageElement>` - получает DOM-элемент изображения.
Параметры:
`".card__image" `- селектор изображения;
`container` - контекст поиска элемента.
`this.descriptionElement = ensureElement<HTMLParagraphElement>` - получает DOM-элемент с описанием товара.
Параметры:
`".card__text"` - селектор описания;
`container` - контекст поиска элемента.
`this.addDeleteButton = ensureElement<HTMLButtonElement>` - получает DOM-элемент кнопки добавления или удаления товара.
Параметры:
`".card__button"` - селектор кнопки;
`container` - контекст поиска элемента.
`this.addDeleteButton.addEventListener("click", actions.onClick)` - устанавливает слушатель события. При нажатии вызывается переданный обработчик.
Обработчик генерирует событие `"cart:add"` или `"cart:remove"` в зависимости от наличия товара в корзине.
Сеттеры
`set category(value: string)` - устанавливает категорию товара и соответствующий CSS-модификатор.
`set image(value: string)` - устанавливает изображение товара.
`set description(value: string)` - принимает описание товара и отображает его в элементе descriptionElement.
`this.descriptionElement.textContent = value;`
`set buttonText(value: string)` - изменяет текст кнопки.
`this.addDeleteButton.textContent = value;`
`set buttonDisabled(value: boolean)` - блокирует или активирует кнопку.
`this.addDeleteButton.disabled = value;`
Кнопка может иметь следующие состояния:
«В корзину» - товар доступен и отсутствует в корзине;
«Удалить из корзины» - товар уже добавлен;
«Недоступно» - у товара отсутствует цена, кнопка заблокирована.

export class CardBasket extends Card<ICardBasket>
Класс CardBasket отвечает за отображение отдельного товара в корзине. Наследуется от абстрактного класса Card.
Поля
private indexElement: HTMLSpanElement - элемент с порядковым номером товара.
private totalCostElement: HTMLSpanElement - элемент со стоимостью товара.
private deleteButton: HTMLButtonElement - кнопка удаления товара из корзины.
Конструктор
constructor(container: HTMLElement, actions: ICardActions) - принимает корневой DOM-элемент карточки и объект с обработчиками действий.
this.indexElement = ensureElement<HTMLSpanElement> - получает DOM-элемент с порядковым номером товара.
Параметры:
".basket\_\_item-index" - селектор номера;
container - контекст поиска элемента.
this.totalCostElement = ensureElement<HTMLSpanElement> - получает DOM-элемент со стоимостью товара.
Параметры:
".card\*\*price" - селектор стоимости;
container - контекст поиска элемента.
this.deleteButton = ensureElement<HTMLButtonElement> - получает DOM-элемент кнопки удаления.
Параметры:
".basket\_\_item-delete" - селектор кнопки удаления;
container - контекст поиска элемента.
this.deleteButton.addEventListener("click", actions.onClick) - устанавливает слушатель события. При нажатии вызывается обработчик, генерирующий событие "cart:remove".
Сеттеры
set index(value: number) - принимает порядковый номер товара и отображает его в элементе indexElement.
this.indexElement.textContent = String(value);
set totalCost(value: number) - принимает стоимость товара и отображает её в элементе totalCostElement.
this.totalCostElement.textContent = `${value} синапсов`;
export class FormOrder extends Form<IOrderForm>
Класс FormOrder отвечает за первый этап оформления заказа: выбор способа оплаты и ввод адреса доставки. Наследуется от абстрактного класса Form.
Поля
private paymentElements: HTMLButtonElement[] - массив кнопок выбора способа оплаты.
private addressElement: HTMLInputElement - поле ввода адреса доставки.
private forwardButton: HTMLButtonElement - кнопка «Далее».
Конструктор
constructor(container: HTMLFormElement, events: IEvents) - принимает корневой DOM-элемент формы и брокер событий.
this.paymentElements = Array.from(...) - получает массив кнопок оплаты.
this.paymentElements = Array.from(
container.querySelectorAll<HTMLButtonElement>(".button_alt")
);
Кнопки оплаты:
«Онлайн»;
«При получении».
Для каждой кнопки устанавливается слушатель события "click".
При нажатии генерируется событие "order:payment" с выбранным способом оплаты.
this.addressElement = ensureElement<HTMLInputElement> - получает поле ввода адреса.
Параметры:
"input[name='address']" - селектор поля адреса;
container - контекст поиска элемента.
this.addressElement.addEventListener("input", ...) - устанавливает слушатель изменения адреса.
При вводе генерируется событие "order:change".
При отправке формы генерируется событие "order:submit".
Сеттеры
set payment(value: TPayment) - принимает выбранный способ оплаты.
У всех кнопок удаляется модификатор:
button_alt-active
После этого модификатор добавляется кнопке, соответствующей выбранному способу оплаты.
set address(value: string) - устанавливает значение в поле адреса.
this.addressElement.value = value;
set valid(value: boolean) - управляет доступностью кнопки «Далее».
set errors(value: string) - отображает ошибки формы.
export class FormContacts extends Form<IContactsForm>
Класс FormContacts отвечает за второй этап оформления заказа: ввод электронной почты и номера телефона. Наследуется от абстрактного класса Form.
Поля
private emailElement: HTMLInputElement - поле ввода электронной почты.
private phoneElement: HTMLInputElement - поле ввода номера телефона.
private submitButton: HTMLButtonElement - кнопка подтверждения заказа.
Конструктор
constructor(container: HTMLFormElement, events: IEvents) - принимает корневой DOM-элемент формы и брокер событий.
this.emailElement = ensureElement<HTMLInputElement> - получает поле ввода электронной почты.
Параметры:
"input[name='email']" - селектор поля электронной почты;
container - контекст поиска элемента.
this.phoneElement = ensureElement<HTMLInputElement> - получает поле ввода телефона.
Параметры:
"input[name='phone']" - селектор поля телефона;
container - контекст поиска элемента.
Для полей устанавливаются слушатели события "input".
При изменении значений генерируется событие "contacts:change" с названием изменённого поля и его новым значением.
При отправке формы генерируется событие "contacts:submit".
Сеттеры
set email(value: string) - устанавливает электронную почту пользователя.
this.emailElement.value = value;
set phone(value: string) - устанавливает номер телефона пользователя.
this.phoneElement.value = value;
set valid(value: boolean) - включает или отключает кнопку подтверждения заказа.
set errors(value: string) - отображает ошибки формы.

###### События

Взаимодействие между слоями приложения осуществляется с помощью брокера событий EventEmitter.
События генерируются классами представления и моделями данных. Презентер подписывается на события и координирует взаимодействие между слоями приложения.
События представления
"card:select"
Пользователь выбрал карточку товара для просмотра.
Данные события:
{
id: string;
}
"basket:open"
Пользователь нажал на иконку корзины.
Событие не передаёт данные.
"cart:add"
Пользователь нажал кнопку добавления товара в корзину.
Данные события:
{
id: string;
}
"cart:remove"
Пользователь нажал кнопку удаления товара из корзины.
Данные события:
{
id: string;
}
"order:open"
Пользователь нажал кнопку оформления заказа.
Событие не передаёт данные.
"order:payment"
Пользователь выбрал способ оплаты.
Данные события:
{
payment: TPayment;
}
"order:change"
Пользователь изменил адрес доставки.
Данные события:
{
field: "address";
value: string;
}
"contacts:change"
Пользователь изменил электронную почту или номер телефона.
Данные события:
{
field: "email" | "phone";
value: string;
}
"order:submit"
Пользователь подтвердил первый этап оформления заказа.
Событие не передаёт данные.
"contacts:submit"
Пользователь подтвердил второй этап оформления и отправку заказа.
Событие не передаёт данные.
"modal:close"
Пользователь нажал кнопку закрытия или фон модального окна.
Событие не передаёт данные.
"success:close"
Пользователь закрыл сообщение об успешном оформлении заказа.
Событие не передаёт данные.
События моделей данных
"catalog:changed"
Модель Shop сохранила новый массив товаров.
После получения события презентер получает товары из модели и создаёт карточки каталога.
"product:selected"
В модели Shop изменился товар, выбранный для просмотра.
После получения события презентер создаёт карточку предпросмотра и открывает модальное окно.
"cart:changed"
Изменилось содержимое корзины.
Данные события:
{
count: number;
}
После получения события презентер обновляет счётчик корзины и, если корзина открыта, её содержимое.
"buyer:changed"
Изменились данные покупателя.
После получения события презентер проверяет заполненность полей и обновляет состояние форм.

####### Презентер

function presenter(...)
В приложении используется один презентер, реализованный в виде функции presenter() в файле main.ts.
Отдельный класс презентера не используется, поскольку приложение является одностраничным.
Презентер связывает модели данных и классы представления и реализует архитектурный паттерн MVP - Model–View–Presenter.
Параметры функции
Функция принимает модели через интерфейсы:
shop: IShopModel
cart: ICartModel
buyer: IBuyerModel
Функция принимает представления через интерфейсы:
header: IHeaderView
gallery: IGalleryView
basket: IBasketView
modal: IModalView
success: ISuccessView
orderForm: IOrderFormView
contactsForm: IContactsFormView
Также функция принимает:
events: IEvents
communication: ICommunication
events - брокер событий.
communication - слой взаимодействия с сервером, использующий базовый класс Api.
Загрузка каталога
Презентер вызывает метод коммуникационного слоя:
communication.getProducts();
После получения ответа массив товаров сохраняется в модели:
shop.setItems(data.items);
Модель генерирует событие "catalog:changed".
Создание карточки каталога
Отдельная функция:
function createCatalogCard(
product: IProduct,
events: IEvents
): HTMLElement
создаёт одну карточку товара.
Функция:
клонирует шаблон карточки;
создаёт экземпляр CardGallery;
передаёт карточке обработчик выбора;
вызывает render() с данными товара;
возвращает готовый DOM-элемент.
В обработчике события "catalog:changed" презентер получает массив товаров:
shop.getItems();
Для каждого товара вызывается createCatalogCard.
const cards = shop
.getItems()
.map((product) => createCatalogCard(product, events));
После этого массив карточек передаётся в компонент Gallery:
gallery.render({
catalog: cards,
});
Выбор товара
Представление CardGallery генерирует событие:
card:select
Презентер получает идентификатор товара, находит его через модель и сохраняет выбранный товар:
const product = shop.getProduct(id);
if (product) {
shop.setSelectedItem(product);
}
После изменения выбранного товара модель генерирует событие "product:selected".
Презентер получает выбранный товар, создаёт карточку CardPreview, передаёт её в Modal и открывает модальное окно.
Работа с корзиной
При событии "cart:add" презентер:
получает товар из модели Shop;
вызывает cart.addItem(product);
закрывает модальное окно.
При событии "cart:remove" презентер:
вызывает cart.removeItem(id);
закрывает модальное окно или обновляет содержимое корзины.
После изменения корзины модель генерирует событие "cart:changed".
Презентер обновляет счётчик:
header.render({
counter: cart.getCount(),
});
Открытие корзины
При событии "basket:open" презентер:
получает массив товаров из модели Cart;
создаёт для каждого товара экземпляр CardBasket;
собирает массив DOM-элементов;
передаёт массив в Basket;
передаёт общую стоимость;
вставляет корзину в Modal;
открывает модальное окно.
Работа с формами
При событии "order:payment" презентер сохраняет выбранный способ оплаты в модели Buyer.
При событии "order:change" презентер сохраняет адрес доставки.
При событии "contacts:change" презентер сохраняет электронную почту или телефон.
После каждого изменения модель генерирует событие "buyer:changed".
Презентер проверяет данные и обновляет:
form.valid
form.errors
При событии "order:submit" презентер открывает вторую форму.
При событии "contacts:submit" презентер формирует объект заказа и отправляет его на сервер через Communication.
Успешное оформление заказа
После успешного ответа сервера презентер:
сохраняет итоговую стоимость;
очищает корзину;
очищает данные покупателя;
передаёт стоимость в компонент Success;
вставляет компонент Success в модальное окно.
При событии "success:close" презентер закрывает модальное окно.
Обязанности презентера
Презентер:
загружает данные с сервера;
подписывается на события моделей и представлений;
вызывает методы моделей;
создаёт компоненты карточек;
обновляет классы представления;
управляет модальными окнами;
выполняет проверку данных форм;
отправляет заказ на сервер;
очищает данные после успешного оформления.
Презентер не хранит каталог, корзину или данные покупателя. Эти данные хранятся только в моделях.
Презентер не генерирует события. Он обрабатывает события и вызывает методы моделей или представлений.
Последовательность взаимодействия
Пользователь
→ Представление
→ emit()
→ EventEmitter
→ Presenter
→ Model
→ emit()
→ EventEmitter
→ Presenter
→ Представление
Таким образом:
Model хранит и изменяет данные;
View отображает интерфейс и сообщает о действиях пользователя;
Presenter связывает модели и представления и содержит логику приложения.
