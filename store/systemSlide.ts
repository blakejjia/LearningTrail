import { db, usersTable } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { convertStateToData } from "./utils";

export type SystemData = Pick<SystemSlice, "parentPassword" | "shortId">;

export interface SystemSlice {
  parentPassword: string;
  shortId: string;
  setParentPassword: (parentPassword: string) => void;
  setShortId: (shortId: string) => void;

  loadFromDb: (uuid: string) => void;
  saveToDb: (uuid: string) => void;
}

export const createSystemSlice = (set: any, get: any): SystemSlice => ({
  parentPassword: "",
  shortId: "",
  setParentPassword: (parentPassword) => set({ parentPassword }),
  setShortId: (shortId) => set({ shortId }),

  loadFromDb: async (uuid: string) => {
    const data = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, uuid));
    if (data[0].data.system) {
      set(data[0].data.system);
    } else {
      set({ parentPassword: "", shortId: "" });
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
