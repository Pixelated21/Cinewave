import { formatSearchQuery } from "@/lib/utils";
import axios from "axios";

export async function multiSearchAction({ term }: { term: string }) {
    const sanitizedQuery = formatSearchQuery(term, false);
    const searchTerms = sanitizedQuery.trim().split(' ');

    let aggregatedResults = []
    let aggregatedPages = 0
    let aggregatedTotalResults = 0

    try {
        const apiRequests = searchTerms.map(async (term) => {

            const res = await axios.get(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/search/multi`, {
                params: {
                    api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
                    query: term,
                    language: "en-US",
                },
            });

            return res.data
        });

        const results = await Promise.all(apiRequests)

        aggregatedResults = results.map((result) => result.results).flat()
        aggregatedPages = results.map((result) => result.total_pages).reduce((a, b) => a + b)
        aggregatedTotalResults = results.map((result) => result.total_results).reduce((a, b) => a + b)

    }
    catch (error) {
        return console.log(error)
    }


    return {
        term,
        sanitizedQuery,
        searchTerms,
        data: {
            pages: aggregatedPages,
            total_results: aggregatedTotalResults,
            results: aggregatedResults,
        }
    }
};