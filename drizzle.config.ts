import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle/migrations/",
  schema: "./drizzle/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.EXPO_PUBLIC_DATABASE_URL!,
  },
});
