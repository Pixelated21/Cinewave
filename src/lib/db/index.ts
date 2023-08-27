import { drizzle } from "drizzle-orm/node-postgres";
import mysql from "mysql2/promise";
import { Client, Pool } from "pg";

const pool = new Pool({
	// connectionString: process.env.POSTGRES_URL + "?sslmode=require",
	connectionString: process.env.POSTGRES_URL,
});

export const db = drizzle(pool);
