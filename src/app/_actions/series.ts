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
