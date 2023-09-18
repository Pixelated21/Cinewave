import { daysToSeconds, formatSearchQuery, parsePaginationPageNumber } from "@/lib/utils";

export async function multiSearchAction({
	term,
	page,
}: {
	term: string;
	page: number | string;
}) {
	const sanitizedQuery = formatSearchQuery(term, false);

	const params = new URLSearchParams({
		api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
		page: parsePaginationPageNumber(page),
		query: sanitizedQuery,
		language: "en-US",
	});

	const res = await fetch(
		`${
			process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL
		}/search/multi?${params.toString()}`,
		{ next: { revalidate: daysToSeconds(2) } }
	);
	const data = await res.json();
	return data;
}
