import { db } from "@/lib/db";
import {
	InsertSharedResource,
	sharedResource,
} from "@/lib/db/schema/sharedResource";
import { and, eq } from "drizzle-orm";

export async function findSharedResourceAction(
	shared_list_id: number,
	resource_id: string
) {
	try {
		const results = await db.query.sharedResource.findFirst({
			where: (sharedResource) =>
				and(
					eq(sharedResource.shared_list_id, shared_list_id),
					eq(sharedResource.resource_id, resource_id)
				),
		});
		console.log(results);
		return results;
	} catch (error) {
		console.log(error);
	}
}
export async function createSharedResourceAction(
	resource_data: InsertSharedResource
) {
	try {
		const results = await db.insert(sharedResource).values({
			shared_list_id: resource_data.shared_list_id,
			resource_id: resource_data.resource_id,
		});

		return results;
	} catch (error) {
		console.log(error);
	}
}
