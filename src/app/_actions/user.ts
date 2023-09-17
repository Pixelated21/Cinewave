import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { watchlist } from "@/lib/db/schema/watchlist";
import { eq } from "drizzle-orm";

export async function getCurrentUserAction(from: "session" | "db" = "session") {
	try {
		const session = await getAuthSession();
		const userId = session?.user?.id;

		if (!userId) return null;

		if (from === "session") {
			return session?.user;
		}

		const user = await db.select().from(users).where(eq(users.id, userId));

		return user[0];
	} catch (error) {
		console.log(error);
	}
}

export async function getCurrentUserWatchListAction() {
	try {
		const currentUser = await getCurrentUserAction("session");
		if (!currentUser) {
			throw new Error("Unauthorized");
		}
		const userWatchList = await db
			.select()
			.from(watchlist)
			.where(eq(watchlist.userId, currentUser.id));
		return userWatchList;
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error(error.message ?? "Something went wrong");
		}
	}
}
