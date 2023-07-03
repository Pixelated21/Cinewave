import { DiscoverMovieAdvancedFilters } from "@/types";
import axios from "axios";

export async function getLatestSeriesAction({ filter }: { filter: DiscoverMovieAdvancedFilters }) {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/discover/tv`,
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

export async function getTrendingSeriesAction() {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/trending/tv/day`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
                language: 'en-US',
            },
        }
    );
    return res.data;
};

export async function getDiscoverSeriesAction() {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/discover/tv`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
                language: "en-US",
            },
        }
    );
    return res.data;
};

export async function getSeriesDetailsAction({ id }: { id: string | number }) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/tv/${id}`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
                language: "en-US",
            },
        });
    return res.data;
};

export async function getSeriesCreditsAction({ id }: { id: string | number }) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/tv/${id}/credits`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
                language: "en-US",
            },
        });
    return res.data;
};

export async function getSeriesVideosAction({ id }: { id: string | number }) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/tv/${id}/videos`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
                language: "en-US",
            },
        });
    return res.data;
};

export async function getSeriesRecommendationsAction({ id }: { id: string | number }) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/tv/${id}/recommendations`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
                language: "en-US",
            },
        });
    return res.data;
};

