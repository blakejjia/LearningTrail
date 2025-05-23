import { Category, defaultCategories } from "./models/category";
import { Currency, defaultCurrencies } from "./models/currency";

export interface ModelsSlide {
  currencies: Currency[];
  categories: Category[];
}

export const createModelsSlide = (set: any, get: any): ModelsSlide => ({
  currencies: defaultCurrencies,
  categories: defaultCategories,
});
