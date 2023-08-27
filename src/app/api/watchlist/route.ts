import {
	addToWatchlistAction,
	findMovieInWatchListAction,
	getUserWatchListAction,
} from "@/app/_actions/movie";

export async function GET() {
	try {
		const res = await getUserWatchListAction('1');
		return new Response(JSON.stringify(res), { status: 200 });
	} catch (error) {
		return new Response("Something went wrong", { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const json = await req.json();
		const {
			user_id,
			resource_id,
			poster_path,
			title,
			release_date,
			resource_type,
		} = json;

		const alreadyInWatchlist = await findMovieInWatchListAction(
			resource_id,
			user_id
		);

		if (alreadyInWatchlist.length > 0) {
			return new Response("Already in watchlist", { status: 409 });
		}

		const res = await addToWatchlistAction({
			user_id,
			resource_id,
			poster_path,
			title,
			release_date,
			resource_type,
		});
		return new Response("Added to watchlist", { status: 200 });
	} catch (error) {
		return new Response("Something went wrong", { status: 500 });
	}
}
