import type { IBuyer } from './index.ts';


export class Buyer {
    private data: IBuyer = {
        payment: null,
        address: '',
        email: '',
        phone: ''
    };
    
    // Сохранение данных (один или несколько)
    setData(newData: IBuyer): void {
        this.data = { ...this.data, ...newData}
    }
    
    // Получение всех данных
    getData(): IBuyer {
        return this.data;
    }

    // Очистка данных
    clearData(): void {
        this.data = {
            payment: null,
            address: '',
            email: '',
            phone: ''
        }
    }

    // Валидация данных
    validateField(field: keyof IBuyer): boolean {
        const value = this.data[field];
        return value !== undefined && value?.toString().trim() !== '';
    }

    // Валидация всех данных
    validateAll(): { [key in keyof IBuyer]: boolean } {
        const result: Partial<{ [key in keyof IBuyer]: boolean }> = {};
        for (const key in this.data) {
            if (Object.prototype.hasOwnProperty.call(this.data, key)) {
                result[key as keyof IBuyer] = this.validateField(key as keyof IBuyer);
            }
        }
        return result as { [key in keyof IBuyer]: boolean };
        }
    }
