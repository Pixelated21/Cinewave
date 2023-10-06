import { db } from "@/lib/db";
import { sharedList } from "@/lib/db/schema/sharedList";
import { and, eq } from "drizzle-orm";
import { URL } from "url";

export async function getAllSharedListAction() {
	try {
		const results = await db.query.sharedList.findMany({
			with: {
				shared_resources: {
					with: {
						resource: true,
					},
				},
			},
		});
		return results;
	} catch (error) {
		console.error(error);
	}
}

export async function getPopularSharedListAction() {
	try {
		const results = await db.query.sharedList.findMany({
			with: {
				shared_resources: {
					with: {
						resource: true,
					},
				},
				user: {
					columns: {
						name: true,
						image: true,
					},
				},
			},
		});
		return results;
	} catch (error) {
		console.error(error);
	}
}

export async function findSharedListAction(shared_list_link: string) {
	try {
		const results = await db.query.sharedList.findFirst({
			where: (sharedList) => and(eq(sharedList.link, shared_list_link)),
			with: {
				shared_resources: {
					with: {
						resource: true,
					},
				},
				user: true,
			},
		});

		return results;
	} catch (error) {
		console.error(error);
	}
}

export async function createSharedListAction(title: string, user_id: string) {
	try {
		const generatedLink = new URL(
			`/shared_list/${crypto.randomUUID()}`,
			process.env.NEXT_PUBLIC_NEXT_APP_URL
		).href;

		const results = await db.insert(sharedList).values({
			user_id: user_id,
			title: title,
			link: generatedLink,
		});

		return results;
	} catch (error) {
		console.error(error);
	}
}
