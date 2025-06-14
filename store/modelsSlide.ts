import { Category } from "./models/category";
import { Currency } from "./models/currency";

export type ModelsData = Pick<ModelsSlide, "currencies" | "categories">;

export interface ModelsSlide {
  currencies: Currency[];
  categories: Category[];

  getCurrency: (id: string) => Currency | null;
  getCategory: (id: string) => Category | null;
}

export const createModelsSlide = (set: any, get: any): ModelsSlide => ({
  currencies: [],
  categories: [],

  getCurrency: (id: string) =>
    get().currencies.find((currency: Currency) => currency.id === id) || null,
  getCategory: (id: string) =>
    get().categories.find((category: Category) => category.id === id) || null,
});
