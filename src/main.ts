import "./scss/styles.scss";

import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import type { IEvents } from "./components/base/Events";
import { Comunication } from "./components/comunicationLayer/Comunication";
import { Buyer } from "./components/models/Buyer";
import { Cart } from "./components/models/Cart";
import { Shop } from "./components/models/Shop";
import { Basket } from "./components/views/Basket";
import { CardBasket } from "./components/views/Cards/CardBasket";
import { CardGallery } from "./components/views/Cards/CardGallery";
import { CardPreview } from "./components/views/Cards/CardPreview";
import { FormContacts } from "./components/views/Forms/FormContacts";
import { FormOrder } from "./components/views/Forms/FormOrder";
import { Gallery } from "./components/views/Gallery";
import { Header } from "./components/views/Header";
import { Modal } from "./components/views/Modal";
import { Success } from "./components/views/Success";
import type {
  IBuyer,
  IBuyerChangedEvent,
  IBuyerModel,
  ICartModel,
  IComunication,
  IFormContacts,
  IFormContactsView,
  IFormFieldEvent,
  IFormOrder,
  IFormOrderView,
  IGalleryView,
  IHeaderView,
  IModalView,
  IProduct,
  IProductIdEvent,
  IShopModel,
  ISuccessView,
  IBasketView,
  TBuyerErrors,
  TPayment,
} from "./types";
import { API_URL, CDN_URL } from "./utils/constants";
import { cloneTemplate, createElement, ensureElement } from "./utils/utils";

type ModalScreen =
  | "preview"
  | "basket"
  | "order"
  | "contacts"
  | "success"
  | null;

function createCatalogCard(product: IProduct, events: IEvents): HTMLElement {
  const card = new CardGallery(cloneTemplate("#card-catalog"), {
    onClick: () =>
      events.emit<IProductIdEvent>("card:select", { id: product.id }),
  });

  return card.render({
    ...product,
    image: `${CDN_URL}${product.image}`,
  });
}

function createPreviewCard(
  product: IProduct,
  inCart: boolean,
  events: IEvents,
): HTMLElement {
  const card = new CardPreview(cloneTemplate("#card-preview"), {
    onBuy: () => events.emit<IProductIdEvent>("cart:add", { id: product.id }),
  });

  return card.render({
    ...product,
    image: `${CDN_URL}${product.image}`,
    buttonText: inCart ? "Уже в корзине" : "В корзину",
    buttonDisabled: inCart || product.price === null,
  });
}

function createBasketCard(
  product: IProduct,
  index: number,
  events: IEvents,
): HTMLElement {
  const card = new CardBasket(cloneTemplate("#card-basket"), {
    onDelete: () =>
      events.emit<IProductIdEvent>("cart:remove", { id: product.id }),
  });

  return card.render({
    title: product.title,
    price: product.price,
    index,
  });
}

function getBuyerErrors(data: IBuyer): TBuyerErrors {
  const errors: TBuyerErrors = {};

  if (!data.payment) errors.payment = "Выберите способ оплаты";
  if (!data.address.trim()) errors.address = "Укажите адрес доставки";
  if (!data.email.trim()) {
    errors.email = "Укажите email";
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Введите корректный email";
  }
  if (!data.phone.trim()) {
    errors.phone = "Укажите телефон";
  } else if (data.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Введите корректный телефон";
  }

  return errors;
}

function errorText(
  errors: TBuyerErrors,
  fields: Array<keyof TBuyerErrors>,
): string {
  return fields
    .map((field) => errors[field])
    .filter((message): message is string => Boolean(message))
    .join("; ");
}

export function presenter(
  communication: IComunication,
  shop: IShopModel,
  cart: ICartModel,
  buyer: IBuyerModel,
  header: IHeaderView,
  gallery: IGalleryView,
  basket: IBasketView,
  modal: IModalView,
  success: ISuccessView,
  orderForm: IFormOrderView,
  contactsForm: IFormContactsView,
  events: IEvents,
): void {
  let activeScreen: ModalScreen = null;

  const renderBasket = (): void => {
    const items = cart.getItems();
    basket.render({
      items: items.map((product, index) =>
        createBasketCard(product, index + 1, events),
      ),
      total: cart.getTotalCost(),
      valid: items.length > 0,
    });
    modal.content = basket.render();
  };

  const renderOrder = (state: IBuyerChangedEvent): void => {
    const buyerErrors = getBuyerErrors(state);
    const errors = errorText(buyerErrors, ["payment", "address"]);
    const data: IFormOrder = {
      payment: state.payment,
      address: state.address,
      errors,
      valid: !buyerErrors.payment && !buyerErrors.address,
    };
    modal.content = orderForm.render(data);
  };

  const renderContacts = (state: IBuyerChangedEvent): void => {
    const buyerErrors = getBuyerErrors(state);
    const errors = errorText(buyerErrors, ["email", "phone"]);
    const data: IFormContacts = {
      email: state.email,
      phone: state.phone,
      errors,
      valid: !buyerErrors.email && !buyerErrors.phone,
    };
    modal.content = contactsForm.render(data);
  };

  events.on("catalog:changed", () => {
    gallery.catalog = shop
      .getItems()
      .map((product) => createCatalogCard(product, events));
  });

  events.on<IProductIdEvent>("card:select", ({ id }) => {
    const product = shop.getProduct(id);
    if (product) {
      shop.setSelectedItem(product);
    }
  });

  events.on("product:selected", () => {
    const product = shop.getSelectedItem();
    if (!product) return;

    activeScreen = "preview";
    modal.content = createPreviewCard(
      product,
      cart.hasProduct(product.id),
      events,
    );
    modal.open();
  });

  events.on<IProductIdEvent>("cart:add", ({ id }) => {
    const product = shop.getProduct(id);
    if (product && product.price !== null) cart.addItem(product);
    activeScreen = null;
    modal.close();
  });

  events.on<IProductIdEvent>("cart:remove", ({ id }) => {
    cart.removeItem(id);
  });

  events.on("cart:changed", () => {
    header.counter = cart.getCount();
    if (activeScreen === "basket") renderBasket();
  });

  events.on("basket:open", () => {
    activeScreen = "basket";
    renderBasket();
    modal.open();
  });

  events.on("order:open", () => {
    const state = buyer.getData();
    activeScreen = "order";
    renderOrder(state);
  });

  events.on<{ payment: TPayment }>("order:payment", ({ payment }) => {
    buyer.setField("payment", payment);
  });

  events.on<IFormFieldEvent<"address">>("order:change", ({ field, value }) => {
    buyer.setField(field, value);
  });

  events.on<IFormFieldEvent<"email" | "phone">>(
    "contacts:change",
    ({ field, value }) => {
      if (field === "email") buyer.setField("email", value);
      if (field === "phone") buyer.setField("phone", value);
    },
  );

  events.on<IBuyerChangedEvent>("buyer:changed", (state) => {
    if (activeScreen === "order") renderOrder(state);
    if (activeScreen === "contacts") renderContacts(state);
  });

  events.on("order:submit", () => {
    const state = buyer.getData();
    const errors = getBuyerErrors(state);
    if (errors.payment || errors.address) {
      renderOrder(state);
      return;
    }

    activeScreen = "contacts";
    renderContacts(state);
  });

  events.on("contacts:submit", async () => {
    const state = buyer.getData();
    const errors = getBuyerErrors(state);
    if (errors.email || errors.phone) {
      renderContacts(state);
      return;
    }

    const total = cart.getTotalCost();
    try {
      await communication.postProduct({
        ...state,
        items: cart.getItems().map((item) => item.id),
        total,
      });

      activeScreen = "success";
      success.total = total;
      modal.content = success.render();
      cart.clearCart();
      buyer.clear();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Не удалось оформить заказ";
      modal.content = contactsForm.render({
        email: state.email,
        phone: state.phone,
        valid: true,
        errors: message,
      });
    }
  });

  events.on("success:close", () => {
    activeScreen = null;
    modal.close();
  });

  events.on("modal:close", () => {
    activeScreen = null;
    modal.close();
  });

  communication
    .getProducts()
    .then((res) => shop.setItems(res.items))
    .catch((error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Не удалось загрузить каталог";
      gallery.catalog = [
        createElement<HTMLElement>("p", {
          textContent: `Ошибка загрузки: ${message}`,
        }),
      ];
    });
}

const events = new EventEmitter();
const communication = new Comunication(new Api(API_URL));

const shop = new Shop(events);
const cart = new Cart(events);
const buyer = new Buyer(events);

const header = new Header(ensureElement<HTMLElement>(".header"), events);
const gallery = new Gallery(ensureElement<HTMLElement>(".gallery"));
const basket = new Basket(cloneTemplate<HTMLElement>("#basket"), events);
const modal = new Modal(ensureElement<HTMLElement>(".modal"), {
  onClose: () => events.emit("modal:close"),
});
const success = new Success(cloneTemplate<HTMLElement>("#success"), events);
const orderForm = new FormOrder(
  cloneTemplate<HTMLFormElement>("#order"),
  events,
);
const contactsForm = new FormContacts(
  cloneTemplate<HTMLFormElement>("#contacts"),
  events,
);

presenter(
  communication,
  shop,
  cart,
  buyer,
  header,
  gallery,
  basket,
  modal,
  success,
  orderForm,
  contactsForm,
  events,
);
