import type { IBuyer } from "../../types/index.ts";
import type { isValid } from "../../types/index.ts";

export class Buyer {
    private data: IBuyer = {
        payment: null,
        address: "",
        email: "",
        phone: "",
    };

    // Сохранение данных (один или несколько)
    setData(newData: IBuyer): void {
        this.data = { ...this.data, ...newData };
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
    }

    // Валидация данных
    validate(): isValid {
        const validationRules: { [key: string]: string | true } = {
            payment: (({ payment } = this.data) => {
                if (payment !== "card" && payment !== "cash") { 
                    return "Некорректный тип оплаты";
                }
                return true;
            })(),
            address: (({ address } = this.data) => {
                if (address
                    .toString()
                    .trim()
                    .length == 0) {
                    return "Адрес не может быть пустым";
                }
                return true;
            })(),
            email: (({ email } = this.data) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email.trim()) return "Email не может быть пустым";
                if (!emailRegex.test(email)) return "Введите корректный email";
                return true;
            })(),
            phone: (({ phone } = this.data) => {
                if (phone.length < 11)
                    return "Телефон должен содержать минимум 11 символов";
                const phoneRegex =
                    /^(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
                if (!phoneRegex.test(phone)) return "Такой формат не поддерживается";
                return true;
            })(),
        };
        function validateAll(validationRules: {[key: string]: string | true}): isValid {
            const errors: string[] = [];
            for (let key in validationRules) {
                const result = validationRules[key];
                if (result !== true) {
                    errors.push(result);
                } 
            }
            return errors.length ? errors : true;
        }
        return validateAll(validationRules);
    }
}
