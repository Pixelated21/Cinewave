import { getUserWatchListAction } from "@/app/_actions/movie";
import { getCurrentUserAction } from "@/actions/user";
import {
	addToBookmarkAction,
	findResourceInBookmarkAction,
} from "@/app/_actions/bookmark";
import {
	addToResourceAction,
	findResourceAction,
} from "@/app/_actions/resource";

export async function GET() {
	try {
		const currentUser = await getCurrentUserAction("session");

		if (!currentUser || !currentUser.id) {
			return new Response("Unauthorized", { status: 401 });
		}

		const res = await getUserWatchListAction(currentUser.id!);
		return new Response(JSON.stringify(res), { status: 200 });
	} catch (error) {
		return new Response("Something went wrong", { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const json = await req.json();
		const currentUser = await getCurrentUserAction("db");

		const { resource_id, poster_path, backdrop_path, title, release_date, resource_type } =
			json;

		if (!currentUser || !currentUser.id) {
			return new Response("Unauthorized", { status: 401 });
		}

		const alreadyBookmarked = await findResourceInBookmarkAction(
			resource_id,
			currentUser.id
		);

		if (alreadyBookmarked) {
			return new Response("Already bookmarked", { status: 409 });
		}

		const resourceExist = await findResourceAction(
			resource_id,
			resource_type
		);

		if (!resourceExist) {
			const persistResource = await addToResourceAction({
				resource_id: resource_id,
				poster_path: poster_path,
				backdrop_path: backdrop_path,
				title: title,
				release_date: release_date,
				resource_type: resource_type,
			});

			if (!persistResource) {
				return new Response("Something went wrong", { status: 500 });
			}
		}

		const addToBookmark = await addToBookmarkAction({
			user_id: currentUser.id,
			resource_id: resource_id,
		});

		if (!addToBookmark) {
			return new Response("Something went wrong", { status: 500 });
		}
		return new Response("Added to bookmarks", { status: 200 });
	} catch (error) {
		return new Response("Something went wrong", { status: 500 });
	}
}
