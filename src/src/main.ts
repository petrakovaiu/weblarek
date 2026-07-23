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
  IBasketView,
  IBuyerModel,
  ICardPreviewView,
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
  TBuyerErrors,
  TPayment,
} from "./types";
import { API_URL, CDN_URL } from "./utils/constants";
import { cloneTemplate, createElement, ensureElement } from "./utils/utils";

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

function errorText(
  errors: TBuyerErrors,
  fields: Array<keyof TBuyerErrors>,
): string {
  return fields
    .map((field) => errors[field])
    .filter((message): message is string => Boolean(message))
    .join("; ");
}

function presenter(
  communication: IComunication,
  shop: IShopModel,
  cart: ICartModel,
  buyer: IBuyerModel,
  header: IHeaderView,
  gallery: IGalleryView,
  basket: IBasketView,
  modal: IModalView,
  success: ISuccessView,
  previewCard: ICardPreviewView,
  orderForm: IFormOrderView,
  contactsForm: IFormContactsView,
  events: IEvents,
): void {
  const renderBasket = (): void => {
    const items = cart.getItems();

    basket.render({
      items: items.map((product, index) =>
        createBasketCard(product, index + 1, events),
      ),
      total: cart.getTotalCost(),
      valid: items.length > 0,
    });
  };

  const renderPreview = (product: IProduct): void => {
    let buttonText: string;

    if (product.price === null) {
      buttonText = "Недоступно";
    } else if (cart.hasProduct(product.id)) {
      buttonText = "Удалить из корзины";
    } else {
      buttonText = "В корзину";
    }

    previewCard.render({
      title: product.title,
      category: product.category,
      image: product.image,
      description: product.description,
      price: product.price,
      buttonText,
      buttonDisabled: product.price === null,
    });
  };

  const renderForms = (): void => {
    const state = buyer.getData();
    const errors = buyer.validate();

    const orderData: IFormOrder = {
      payment: state.payment,
      address: state.address,
      errors: errorText(errors, ["payment", "address"]),
      valid: !errors.payment && !errors.address,
    };

    const contactsData: IFormContacts = {
      email: state.email,
      phone: state.phone,
      errors: errorText(errors, ["email", "phone"]),
      valid: !errors.email && !errors.phone,
    };

    orderForm.render(orderData);
    contactsForm.render(contactsData);
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

    if (!product) {
      return;
    }

    renderPreview(product);
    modal.content = previewCard.render();
    modal.open();
  });

  events.on("preview:action", () => {
    const product = shop.getSelectedItem();

    if (!product || product.price === null) {
      return;
    }

    if (cart.hasProduct(product.id)) {
      cart.removeItem(product.id);
    } else {
      cart.addItem(product);
    }

    modal.close();
  });

  events.on<IProductIdEvent>("cart:remove", ({ id }) => {
    cart.removeItem(id);
  });

  events.on("cart:changed", () => {
    header.counter = cart.getCount();
    renderBasket();

    const selectedProduct = shop.getSelectedItem();
    if (selectedProduct) {
      renderPreview(selectedProduct);
    }
  });

  events.on("basket:open", () => {
    modal.content = basket.render();
    modal.open();
  });

  events.on("order:open", () => {
    modal.content = orderForm.render();
    modal.open();
  });

  events.on<{ payment: TPayment }>("order:payment", ({ payment }) => {
    buyer.setData({ payment });
  });

  events.on<IFormFieldEvent<"address">>("order:change", ({ value }) => {
    buyer.setData({ address: value });
  });

  events.on<IFormFieldEvent<"email" | "phone">>(
    "contacts:change",
    ({ field, value }) => {
      buyer.setData({ [field]: value });
    },
  );

  events.on("buyer:changed", () => {
    renderForms();
  });

  events.on("order:submit", () => {
    modal.content = contactsForm.render();
    modal.open();
  });

  events.on("contacts:submit", async () => {
    const state = buyer.getData();

    try {
      const order = await communication.postProduct({
        ...state,
        items: cart.getItems().map((item) => item.id),
        total: cart.getTotalCost(),
      });

      success.total = order.total;
      modal.content = success.render();
      modal.open();

      cart.clearCart();
      buyer.clearData();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Не удалось оформить заказ";

      contactsForm.render({
        errors: message,
      });
    }
  });

  events.on("success:close", () => {
    modal.close();
  });

  renderBasket();
  renderForms();
  header.counter = cart.getCount();

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
const modal = new Modal(ensureElement<HTMLElement>(".modal"));
const success = new Success(cloneTemplate<HTMLElement>("#success"), events);
const previewCard = new CardPreview(
  cloneTemplate<HTMLElement>("#card-preview"),
  {
    onBuy: () => events.emit("preview:action"),
  },
);
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
  previewCard,
  orderForm,
  contactsForm,
  events,
);
