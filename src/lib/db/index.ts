import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as bookmark from "@/lib/db/schema/bookmark";
import * as resource from "@/lib/db/schema/resource";
import * as sharedLink from "@/lib/db/schema/sharedList";
import * as sharedResource from "@/lib/db/schema/sharedResource";
import * as user from "@/lib/db/schema/user";

if (!process.env.POSTGRES_URL)
	throw new Error("POSTGRES_URL is missing from env variables");

const pool = new Pool({
	connectionString: process.env.POSTGRES_URL,
});

export const db = drizzle(pool, {
	schema: {
		...bookmark,
		...resource,
		...sharedLink,
		...sharedResource,
		...user,
	},
});
