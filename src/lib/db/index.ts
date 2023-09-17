import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

if (!process.env.POSTGRES_URL)
	throw new Error("POSTGRES_URL is missing from env variables");

const pool = new Pool({
	connectionString: process.env.POSTGRES_URL,
});

export const db = drizzle(pool);
