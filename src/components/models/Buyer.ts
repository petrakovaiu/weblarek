import type { IBuyer } from "../../types/index.ts";
import type { TBuyerErrors } from "../../types/index.ts";
import type { IEvents } from "../base/Events";

export class Buyer {
  private data: IBuyer = {
    payment: null,
    address: "",
    email: "",
    phone: "",
  };

  constructor(private events: IEvents) {}

  // Сохранение данных (один или несколько)
  setData(newData: IBuyer): void {
    this.data = { ...this.data, ...newData };

    this.events.emit("buyer:changed");
  }

  // Получение всех данных
  getData(): IBuyer {
    return this.data;
  }

  // Очистка данных
  clearData(): void {
    this.data = {
      payment: null,
      address: "",
      email: "",
      phone: "",
    };

    this.events.emit("buyer:changed");
  }
  // Валидация данных
  validate(): TBuyerErrors {
    const notValid = (field: string): boolean => field.trim().length == 0;
    const errors: TBuyerErrors = {};
    if (this.data.payment == null) {
      errors.payment = "Выберите тип оплаты";
    }
    if (notValid(this.data.address)) {
      errors.address = "Адрес не может быть пустым";
    }
    if (notValid(this.data.email)) {
      errors.email = "Email не может быть пустым";
    }
    if (notValid(this.data.phone)) {
      errors.phone = "Телефон не может быть пустым";
    }
    return errors;
  }
}
