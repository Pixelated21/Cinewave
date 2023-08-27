import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
	connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export const db = drizzle(pool);
