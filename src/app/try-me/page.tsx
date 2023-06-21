import NavigationBar from "@/components/NavigationBar";
import MovieCard from "@/components/cards/MovieCard";
import MovieGridLayout from "@/components/layouts/MovieGridLayout";
import TryMeCarrousel from "@/components/sections/tryme/TryMeCarrousel";
import TryMeRandomizer from "@/components/sections/tryme/TryMeRandomizer";
import { genres } from "@/data/genres";
import { ratings } from "@/data/ratings";
import { Movie } from "@/typescript/interfaces";
import axios from "axios";

const fetchTrendingMovies = async () => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL}/trending/movie/day`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
            },
        }
    );
    return res.data;
};

export default async function TryMe() {
    const movies = await fetchTrendingMovies();

    const tryMeCarrouselData = {
        movies: movies.results,
    };

    const tryMeRandomizerData = {
        genres,
        ratings,
    };

    return (
        <main className="h-screen overflow-y-auto bg-[#18181B]">
            <NavigationBar className="primary" />
            <TryMeRandomizer data={tryMeRandomizerData} />
            {/* <TryMeCarrousel data={tryMeCarrouselData} /> */}
        </main>
    );
}
