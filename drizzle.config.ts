import type { Config } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";
import { cwd } from "process";

loadEnvConfig(cwd());

const POSTGRES_URL = process.env.POSTGRES_URL ?? "";
if (POSTGRES_URL) throw new Error("POSTGRES_URL is missing from env variables");

export default {
	schema: "./src/lib/db/schema/*",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.POSTGRES_URL,
	},
	breakpoints: true,
} satisfies Config;
