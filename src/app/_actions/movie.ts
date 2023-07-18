import { formatSearchQuery } from "@/lib/utils";
import { DiscoverMovieAdvancedFilters } from "@/types";
import axios from "axios";

// FIXME: If action fails then the page will not render
// TODO: Add error handling


export async function searchMoviesAction({ term }: { term: string }) {
    const sanitizedQuery = formatSearchQuery(term, false);
    const searchTerms = sanitizedQuery.trim().split(' ');

    let aggregatedResults = []
    let aggregatedPages = 0
    let aggregatedTotalResults = 0

    try {
        const apiRequests = searchTerms.map(async (term) => {

            const res = await axios.get(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/search/movie`, {
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

export async function getSimilarMovieAction({ id }: { id: string | number }) {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/movie/${id}/similar`, {
        params: {
            api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
            language: 'en-US',
        }
    })

    return response.data
}

export async function getDiscoverMovieAction() {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/discover/movie`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
                language: "en-US",
            },
        }
    );
    return res.data;
}

export async function getTrendingMoviesAction(genres?: string | number[]) {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/trending/movie/day`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
                language: 'en-US',
            },
        }
    );
    return res.data;
};

export async function getLatestMoviesAction({ filter }: { filter: DiscoverMovieAdvancedFilters }) {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/discover/movie`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
                language: 'en-US',
                ...filter,
            },
        }
    );
    return res.data;
};

export async function getMovieDetailsAction({ id }: { id: string | number }) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/movie/${id}`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
                language: "en-US",
            },
        });
    return res.data;
};

export async function getMovieCreditsAction({ id }: { id: string | number }) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/movie/${id}/credits`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
                language: "en-US",
            },
        });
    return res.data;
};

export async function getMovieVideosAction({ id }: { id: string | number }) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/movie/${id}/videos`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
                language: "en-US",
            },
        });
    return res.data;
};

export async function getMovieRecommendationsAction({ id }: { id: string | number }) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/movie/${id}/recommendations`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
                language: "en-US",
            },
        });
    return res.data;
};

export async function getComingSoonMoviesAction() {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/movie/upcoming`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
                language: "en-US",
            },
        }
    );
    return res.data;
};

export async function toggleFavoriteMovieAction({ id }: { id: number }) {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/movies/favorites`, {
        'movie_id': id,
    });
    return res.data;
}