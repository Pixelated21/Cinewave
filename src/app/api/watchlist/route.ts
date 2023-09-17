import {
	addToWatchlistAction,
	findMovieInWatchListAction,
	getUserWatchListAction,
} from "@/app/_actions/movie";
import { getCurrentUserAction } from "@/app/_actions/user";
import { getAuthSession } from "@/lib/auth";
import { getServerSession } from "next-auth";

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

		const { resource_id, poster_path, title, release_date, resource_type } =
			json;

		if (!currentUser || !currentUser.id) {
			return new Response("Unauthorized", { status: 401 });
		}

		const alreadyInWatchlist = await findMovieInWatchListAction(
			resource_id,
			currentUser.id
		);

		if (alreadyInWatchlist.length > 0) {
			return new Response("Already in watchlist", { status: 409 });
		}

		const res = await addToWatchlistAction({
			userId: currentUser.id,
			resource_id,
			poster_path,
			title,
			release_date,
			resource_type,
		});
		console.log(res);
		return new Response("Added to watchlist", { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response("Something went wrong", { status: 500 });
	}
}
