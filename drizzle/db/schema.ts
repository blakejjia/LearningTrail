import { StoreData } from "@/store";
import { sql } from "drizzle-orm";
import { jsonb, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  shortId: varchar("short_id", { length: 255 }).notNull(),
  data: jsonb("data").$type<StoreData>().default({}).notNull(),
});
