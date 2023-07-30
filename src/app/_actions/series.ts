import { DiscoverMovieAdvancedFilters } from "@/types";
import axios from "axios";

export async function getLatestSeriesAction({ filter }: { filter: DiscoverMovieAdvancedFilters }) {
    const params = new URLSearchParams({
        api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
        language: 'en-US',
        ...filter as string[][],
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/discover/tv?${params.toString()}`);
    const data = await res.json();
    return data;
};

export async function getTrendingSeriesAction() {
    const params = new URLSearchParams({
        api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
        language: 'en-US',
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/trending/tv/day?${params.toString()}`);
    const data = await res.json();
    return data;
};

export async function getDiscoverSeriesAction() {
    const params = new URLSearchParams({
        api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
        language: "en-US",
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/discover/tv?${params.toString()}`);
    const data = await res.json();
    return data;
};

export async function getSeriesDetailsAction({ id }: { id: string | number }) {
    const params = new URLSearchParams({
        api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
        language: "en-US",
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/tv/${id}?${params.toString()}`);
    const data = await res.json();
    return data;
};

export async function getSeriesCreditsAction({ id }: { id: string | number }) {
    const params = new URLSearchParams({
        api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
        language: "en-US",
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/tv/${id}/credits?${params.toString()}`);
    const data = await res.json();
    return data;
};

export async function getSeriesVideosAction({ id }: { id: string | number }) {
    const params = new URLSearchParams({
        api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
        language: "en-US",
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/tv/${id}/videos?${params.toString()}`);
    const data = await res.json();
    return data;
};

export async function getSeriesRecommendationsAction({ id }: { id: string | number }) {
    const params = new URLSearchParams({
        api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
        language: "en-US",
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/tv/${id}/recommendations?${params.toString()}`);
    const data = await res.json();
    return data;
};

