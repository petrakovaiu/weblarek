import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import type { IEvents } from "./components/base/Events";

import { Comunication } from "./components/comunicationLayer/Comunication";

import { Shop } from "./components/models/Shop";
import { Cart } from "./components/models/Cart";
import { Buyer } from "./components/models/Buyer";

import { Header } from "./components/views/Header";
import { Gallery } from "./components/views/Gallery";
import { Basket } from "./components/views/Basket";
import { Modal } from "./components/views/Modal";
import { Success } from "./components/views/Success";

import { CardGallery } from "./components/views/Cards/CardGallery";
import { CardPreview } from "./components/views/Cards/CardPreview";
import { CardBasket } from "./components/views/Cards/CardBasket";

import { FormOrder } from "./components/views/Forms/FormOrder";
import { FormContacts } from "./components/views/Forms/FormContacts";

import type {
  IProduct,
  IHeader,
  IGallery,
  IBasket,
  IModal,
  ISuccess,
  IBuyer,
} from "./types";

import { API_URL } from "./utils/constants";
import { cloneTemplate, ensureElement } from "./utils/utils";

/*
===========================
Абстракции View для Presenter
===========================
*/

interface IHeaderView extends IHeader {
  counter: number;
}

interface IGalleryView extends IGallery {
  catalog: HTMLElement[];
}

interface IBasketView extends IBasket {
  items: HTMLElement[];
  price: number;
}

interface IModalView extends IModal {
  open(): void;
  close(): void;
}

interface ISuccessView extends ISuccess {
  content: string;
}

/*
===========================
PRESENTER
===========================
*/

function presenter(
  shop: Shop,
  cart: Cart,
  buyer: Buyer,

  header: IHeaderView,
  gallery: IGalleryView,
  basket: IBasketView,
  modal: IModalView,
  success: ISuccessView,

  order: FormOrder,
  contacts: FormContacts,

  events: IEvents,

  communication: Comunication,
) {
  let selectedProduct: IProduct | null = null;

  /*
=================================
API → MODEL
=================================
*/

  communication.getProducts().then((data) => {
    shop.setItems(data.items);
  });

  /*
=================================
MODEL → VIEW
=================================
*/

  events.on("catalog:changed", () => {
    const cards = shop.getItems().map((product) => {
      const card = new CardGallery(cloneTemplate("#card-catalog"), events);

      return card.render(product);
    });

    gallery.catalog = cards;
  });

  events.on("cart:changed", (data: { count: number }) => {
    header.counter = data.count;
  });

  events.on("buyer:changed", (data: Partial<IBuyer>) => {});

  /*
=================================
VIEW → MODEL
=================================
*/

  events.on("card:select", (product: IProduct) => {
    selectedProduct = product;

    const preview = new CardPreview(cloneTemplate("#card-preview"), events);

    modal.content = preview.render(product);

    modal.open();
  });

  events.on("cart:add", () => {
    if (selectedProduct) {
      cart.addItem(selectedProduct);
    }

    modal.close();
  });

  events.on("basket:open", () => {
    const cards = cart.getItems().map((product, index) => {
      const card = new CardBasket(cloneTemplate("#card-basket"), events);

      return card.render({
        ...product,
        counter: index + 1,
      });
    });

    basket.items = cards;

    basket.price = cart.getTotalCost();

    modal.content = basket as unknown as HTMLElement;

    modal.open();
  });

  events.on("cart:remove", (data: { id: string }) => {
    cart.removeItem(data.id);
  });

  events.on("order:payment", (data: { payment: string }) => {
    buyer.setField("payment", data.payment);
  });

  events.on("order:change", (data: { field: keyof IBuyer; value: string }) => {
    buyer.setField(data.field, data.value);
  });

  events.on("order:submit", () => {
    modal.content = contacts.render();
  });

  events.on("contacts:submit", () => {
    communication
      .postProduct({
        ...buyer.getData(),
        items: cart.getItems().map((item) => item.id),
        total: cart.getTotalCost(),
      })
      .then((result) => {
        cart.clearCart();

        success.content = `Заказ ${result.id} успешно оформлен`;

        modal.content = success as unknown as HTMLElement;
      });
  });
}

/*
===========================
ИНИЦИАЛИЗАЦИЯ
===========================
*/

const events = new EventEmitter();

const api = new Api(API_URL);

const communication = new Comunication(api);

const shop = new Shop(events);

const cart = new Cart(events);

const buyer = new Buyer(events);

const header = new Header(ensureElement(".header"), events);

const gallery = new Gallery(ensureElement(".gallery"));

const basket = new Basket(cloneTemplate("#basket"), events);

const modal = new Modal(ensureElement(".modal"));

const success = new Success(cloneTemplate("#success"), events);

const order = new FormOrder(cloneTemplate("#order"), events);

const contacts = new FormContacts(cloneTemplate("#contacts"), events);

presenter(
  shop,
  cart,
  buyer,

  header,
  gallery,
  basket,
  modal,
  success,

  order,
  contacts,

  events,

  communication,
);
