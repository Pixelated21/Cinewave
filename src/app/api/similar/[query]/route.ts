import { formatSearchQuery } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";
import { format } from "path";

export async function GET(request: Request, { params }: { params: { query: string } }) {
    const { query } = params

    const fetchSimilarMovies = async (query: string) => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${query}/similar`, {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
                language: 'en-US',
            }
        })

        return response.data
    }

    const similarMovieResponse = await fetchSimilarMovies(query)

    return NextResponse.json(
        similarMovieResponse
    )
}