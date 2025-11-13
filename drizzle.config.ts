import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./src/drizzle/migrations",
    dialect: 'postgresql',
    schema: './src/drizzle/schema.ts',
    dbCredentials: {
        url: process.env.DB_URL!,
    },
})
