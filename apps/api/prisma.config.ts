import { defineConfig, env } from "prisma/config";

export default defineConfig({
	schema: "src/db/prisma/schema/",
	migrations: {
		path: "src/db/migrations/",
	},
	datasource: {
		url: env("DATABASE_URL"),
	},
});
