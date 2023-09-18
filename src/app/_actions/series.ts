import { parsePaginationPageNumber } from "@/lib/utils";
import { DiscoverMovieAdvancedFilters } from "@/types";

export async function getLatestSeriesAction(
	filter: DiscoverMovieAdvancedFilters
) {
	const params = new URLSearchParams({
		api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
		language: "en-US",
		...(filter as string[][]),
	});

	const res = await fetch(
		`${
			process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL
		}/discover/tv?${params.toString()}`
	);
	const data = await res.json();
	return data;
}

export async function getPopularSeriesAction(
	filter: DiscoverMovieAdvancedFilters
) {
	const params = new URLSearchParams({
		api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
		language: "en-US",
		...(filter as string[][]),
	});

	//api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc

	const res = await fetch(
		`${
			process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL
		}/discover/tv?${params.toString()}`
	);
	const data = await res.json();
	return data;
}

export async function getTrendingSeriesAction() {
	const params = new URLSearchParams({
		api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
		language: "en-US",
	});

	const res = await fetch(
		`${
			process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL
		}/trending/tv/day?${params.toString()}`
	);
	const data = await res.json();
	return data;
}

export async function getDiscoverSeriesAction(
page: number | string
) {
	const params = new URLSearchParams({
		api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
		page: parsePaginationPageNumber(page),
		language: "en-US",
	});

	const res = await fetch(
		`${
			process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL
		}/discover/tv?${params.toString()}`
	);
	const data = await res.json();
	return data;
}

export async function getSeriesDetailsAction(id: string | number) {
	const params = new URLSearchParams({
		api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
		language: "en-US",
	});

	const res = await fetch(
		`${
			process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL
		}/tv/${id}?${params.toString()}`
	);
	const data = await res.json();
	return data;
}

export async function getSeriesCreditsAction(id: string | number) {
	const params = new URLSearchParams({
		api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
		language: "en-US",
	});

	const res = await fetch(
		`${
			process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL
		}/tv/${id}/credits?${params.toString()}`
	);
	const data = await res.json();
	return data;
}

export async function getSeriesVideosAction(id: string | number) {
	const params = new URLSearchParams({
		api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
		language: "en-US",
	});

	const res = await fetch(
		`${
			process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL
		}/tv/${id}/videos?${params.toString()}`
	);
	const data = await res.json();
	return data;
}

export async function getSeriesRecommendationsAction(id: string | number) {
	const params = new URLSearchParams({
		api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
		language: "en-US",
	});

	const res = await fetch(
		`${
			process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL
		}/tv/${id}/recommendations?${params.toString()}`
	);
	const data = await res.json();
	return data;
}
