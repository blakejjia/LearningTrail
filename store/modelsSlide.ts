import { db, usersTable } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { Category, defaultCategories } from "./models/category";
import { Currency, defaultCurrencies } from "./models/currency";
import { convertStateToData } from "./utils";

export type ModelsData = Pick<ModelsSlide, "currencies" | "categories">;

export interface ModelsSlide {
  currencies: Currency[];
  categories: Category[];

  loadFromDb: (uuid: string) => void;
  saveToDb: (uuid: string) => void;
}

export const createModelsSlide = (set: any, get: any): ModelsSlide => ({
  currencies: defaultCurrencies,
  categories: defaultCategories,

  loadFromDb: async (uuid: string) => {
    const data = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, uuid));
    if (data[0].data.models) {
      set(data[0].data.models);
    } else {
      set({ currencies: defaultCurrencies, categories: defaultCategories });
    }
  },
  saveToDb: async (uuid: string) => {
    const newData = convertStateToData(get());

    await db
      .update(usersTable)
      .set({ data: newData })
      .where(eq(usersTable.id, uuid));
  },
});
