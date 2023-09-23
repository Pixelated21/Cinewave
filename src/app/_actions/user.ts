import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema/user";
import { bookmark } from "@/lib/db/schema/bookmark";
import { eq } from "drizzle-orm";

export async function getCurrentUserAction(from: "session" | "db" = "session") {
	try {
		const session = await getAuthSession();
		const userId = session?.user?.id;

		if (!userId) return null;

		if (from === "session") {
			return session?.user;
		}

		const currentUser = await db
			.select()
			.from(user)
			.where(eq(user.id, userId));

		return currentUser[0];
	} catch (error) {
		console.error(error);
	}
}

export async function getCurrentUserBookmarksAction() {
	try {
		const currentUser = await getCurrentUserAction("session");
		if (!currentUser) {
			throw new Error("Unauthorized");
		}
		const userBookmarks = await db.query.bookmark.findMany({
			columns: {
				resource_id: true,
			},
			with: {
				resource: true,
			},
			where: (bookmark) => eq(bookmark.user_id, currentUser.id),
		});
		return userBookmarks;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message ?? "Something went wrong");
		}
	}
}
