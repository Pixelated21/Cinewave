import { daysToSeconds, formatSearchQuery } from "@/lib/utils";

export async function multiSearchAction({
	term,
	page,
}: {
	term: string;
	page: string;
}) {
	const sanitizedQuery = formatSearchQuery(term, false);

	const params = new URLSearchParams({
		api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
		query: sanitizedQuery,
		page: page,
		language: "en-US",
	});

	const res = await fetch(
		`${
			process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL
		}/search/multi?${params.toString()}`,
		{ next: { revalidate: daysToSeconds(2) } }
	);
	const data = await res.json();
    console.log(data);
    console.log(params);
	return data;
}
