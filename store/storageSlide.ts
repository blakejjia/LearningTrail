import { db, usersTable } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import {
  convertDataToState,
  convertStateToData,
  SystemFeedback,
} from "./utils";

export interface StorageSlide {
  loadFromDb: () => Promise<SystemFeedback>;
  saveToDb: () => Promise<SystemFeedback>;
}

export const createStorageSlide = (set: any, get: any): StorageSlide => ({
  loadFromDb: async () => {
    const data = await db
      .select({
        data: usersTable.data,
      })
      .from(usersTable)
      .where(eq(usersTable.id, get().accountId ?? ""));
    if (data[0].data) {
      set(convertDataToState(data[0].data));
      return { success: true, message: "load successfully" };
    } else {
      set({});
      return { success: false, message: "load failed" };
    }
  },

  saveToDb: async () => {
    const newData = convertStateToData(get());
    try {
      await db
        .update(usersTable)
        .set({ data: newData })
        .where(eq(usersTable.id, get().accountId ?? ""));
    } catch (error) {
      return { success: false, message: "save failed" };
    }
    return { success: true, message: "save successfully" };
  },
});
