import { formatSearchQuery } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";
import { format } from "path";

export async function GET(request: Request, { params }: { params: { query: string } }) {
    const { query } = params
    const sanitizedQuery = formatSearchQuery(query, false);
    const searchTerms = sanitizedQuery.trim().split(' ');

    let aggregatedResults = []
    let aggregatedPages = 0
    let aggregatedTotalResults = 0

    try {
        const apiRequests = searchTerms.map(async (term) => {
            const formattedUrl = new URL(
                `https://api.themoviedb.org/3/search/movie`
            );

            const response = await axios.get(formattedUrl.href, {
                params: {
                    api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
                    query: term,
                    language: "en-US",
                },
            });

            return response.data
        });

        const results = await Promise.all(apiRequests)

        aggregatedResults = results.map((result) => result.results).flat()
        aggregatedPages = results.map((result) => result.total_pages).reduce((a, b) => a + b)
        aggregatedTotalResults = results.map((result) => result.total_results).reduce((a, b) => a + b)

    }
    catch (error) {
        return NextResponse.error()
    }

    return NextResponse.json(
        {
            query,
            sanitizedQuery,
            searchTerms,
            data: {
                pages: aggregatedPages,
                total_results: aggregatedTotalResults,
                results: aggregatedResults,
            }
        }
    )
}