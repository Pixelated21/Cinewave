import axios from "axios";

export async function getPersonDetailsAction({ id }: { id: string | number }) {
    const params = new URLSearchParams({
        api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/person/${id}?${params.toString()}`);
    const data = await res.json();
    return data;
};