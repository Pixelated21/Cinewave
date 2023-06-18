import axios from "axios";
import { DiscoverMovieAdvancedFilters, Genre, Movie, Trending } from "@/typescript/interfaces";
import TrendingCard from "@/components/cards/TrendingCard";
import HeroSection from "@/components/sections/HeroSection";
import NavigationBar from "@/components/NavigationBar";
import { genres } from "@/data/genres";
import GenreSection from "@/components/sections/home/GenreSection";

const fetchDiscoverMovies = async ({ filter }: { filter: DiscoverMovieAdvancedFilters }) => {
    const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?language=en-US`, {
        params: {
            api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
            ...filter
        }
    })
    return res.data
}

const fetchTrendingMovies = async (genres?: string | number[]) => {
    const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`, {
        params: {
            api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
            with_genres: genres
        }
    })
    return res.data
}

const parseGenres = (genres: Genre[]) => ([...genres].splice(0, 5))

export default async function HomePage(
    { searchParams }: { searchParams: DiscoverMovieAdvancedFilters }) {

    const filteredGenres = parseGenres(genres)
    const moviesData = fetchDiscoverMovies({ filter: { ...searchParams } })
    const trendingData = fetchTrendingMovies()
    const [movies, trending] = await Promise.all([moviesData, trendingData])

    const filteredTrending = [...trending.results].splice(0, 10).filter((movie: Movie) => movie.poster_path !== null && movie.backdrop_path !== null)

    return (
        <main className=" h-screen overflow-y-auto">
            <div className="relative h-[571px] xl:h-[671px] shadow-md">
                <NavigationBar className="z-10 absolute max-w-7xl left-0 right-0 mx-auto w-full" />
                <HeroSection trending={filteredTrending} />
            </div>

            {/* Trending Section */}
            <section className="bg-[#18181B]">
                <div className="mx-auto max-w-7xl py-[60px] px-4 sm:px-8 xl:px-2">
                    <div className="flex flex-col gap-y-5">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-x-5">
                                <h1 className="text-[32px] font-semibold text-white">Trending</h1>
                                <div className="flex gap-x-3 items-center text-white">
                                    <div>Movie</div>
                                    <div>TV</div>
                                </div>

                            </div>
                            <div>
                                <h3 className="text-white text-sm">View all</h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2.5 gap-y-2.5">
                            {trending.results.splice(0, 3).map((item: Trending) => (
                                <TrendingCard key={item.id} movie={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Genres Section */}
            <GenreSection movies={movies} genres={filteredGenres} />
        </main>
    )
}