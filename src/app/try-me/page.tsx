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
    const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/day`, {
        params: {
            api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
        }
    })
    return res.data
}





export default async function TryMe() {

    const movies = await fetchTrendingMovies()

    const tryMeCarrouselData = {
        movies: movies.results
    }

    const tryMeRandomizerData = {
        genres,
        ratings
    }

    return (
        <main className="bg-[#18181B] h-screen overflow-y-auto">
            <NavigationBar className="primary" />
            <TryMeRandomizer data={tryMeRandomizerData} />
            <TryMeCarrousel data={tryMeCarrouselData} />

            <section className="bg-[#18181B]">
                <div className="mx-auto max-w-7xl py-[30px] px-4 sm:px-8 xl:px-2">
                    <MovieGridLayout>
                        {movies.results.map((movie: Movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </MovieGridLayout>
                </div>
            </section>
        </main>
    )
}