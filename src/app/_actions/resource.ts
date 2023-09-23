import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema/bookmark";
import { InsertResource, resource } from "@/lib/db/schema/resource";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export async function addToResourceAction(resource_data: InsertResource) {
	try {
		const results = await db.insert(resource).values(resource_data);
		console.log(results);
		return results;
	} catch (error) {
		console.log(error);
	}
}

export async function findResourceAction(
	resource_id: string,
	resource_type: "movie" | "series"
) {
	try {
		const results = await db.query.resource.findFirst({
			where: (resource) =>
				and(
					eq(resource.resource_id, resource_id),
					eq(resource.resource_type, resource_type)
				),
		});

        console.log(results);

		return results;
	} catch (error) {
		console.log(error);
	}
}
