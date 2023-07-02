import axios from "axios";

export async function getPersonDetailsAction({ id }: { id: string | number }) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/person/${id}`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
            },
        });
    return res.data;
};