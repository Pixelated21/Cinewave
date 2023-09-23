import { db } from "@/lib/db";
import { InsertBookmark, bookmark } from "@/lib/db/schema/bookmark";
import { and, eq } from "drizzle-orm";

export async function addToBookmarkAction(resource: InsertBookmark) {
	try {
		const results = await db.insert(bookmark).values(resource);
		return results;
	} catch (error) {
		console.log(error);
	}
}

// TODO: Determine if it is a movie or series exist and scope the search to that
export async function findResourceInBookmarkAction(
	resource_id: string,
	user_id: string,
	resource_type?: "movie" | "series"
) {
	try {
		const alreadyInBookmarks = await db.query.bookmark.findFirst({
			where: (bookmark) =>
				and(
					eq(bookmark.resource_id, resource_id),
					eq(bookmark.user_id, user_id)
				),
		});
		return alreadyInBookmarks;
	} catch (error) {
		console.log(error);
	}
}
