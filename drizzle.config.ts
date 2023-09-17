import type { Config } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";
import { cwd } from "process";

loadEnvConfig(cwd());

const POSTGRES_URL = process.env["POSTGRES_URL"];

export default {
	schema: "./src/lib/db/schema/*",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		connectionString: POSTGRES_URL,
	},
	breakpoints: true,
} satisfies Config;
