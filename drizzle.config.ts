import type { Config } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";
import { cwd } from "process";

loadEnvConfig(cwd());

export default {
	schema: "./src/lib/db/schema/*",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.POSTGRES_URL,
	},
	breakpoints: true,
} satisfies Config;
