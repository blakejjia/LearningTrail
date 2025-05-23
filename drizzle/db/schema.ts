import { integer, jsonb, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shortId: varchar("short_id", { length: 255 }).notNull(),
  data: jsonb("data").notNull(),
});
