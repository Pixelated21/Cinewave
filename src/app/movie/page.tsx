import NavigationBar from "@/components/NavigationBar";
import MovieCard from "@/components/cards/MovieCard";
import MovieGridLayout from "@/components/layouts/LayoutSection";
import { Button } from "@/components/ui/button";
import { Movie } from "@/types";
import { getDiscoverMovieAction } from "../_actions/movie";

export default async function MoviePage() {
    const getDiscoverMovie = getDiscoverMovieAction();

    const [discoverMovie] = await Promise.all([getDiscoverMovie]);

    const filteredDiscoverMovie = {
        ...discoverMovie,
        results: [
            ...discoverMovie.results.filter(
                (movie: Movie) => movie.poster_path
            ),
        ],
    };

    return (
        <main className="h-screen bg-[#18181B]">
            <NavigationBar className="primary" />
            <section className="overflow-hidden">
                <div className="relative mx-auto max-w-7xl px-4 py-[64px] sm:px-8 xl:px-2">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-xl font-semibold text-white opacity-20 sm:text-[32px] ">
                            Popular Movies
                        </h1>
                        <Button className="border-2 border-white bg-gray-700">
                            Filter
                        </Button>
                    </div>
                </div>
            </section>

            <section className="bg-[#18181B]">
                <div className="relative mx-auto mb-16 mt-6 max-w-7xl px-4 sm:px-8 xl:px-2">
                    <div className="mx-auto h-10 w-64 rounded-md border-2 border-white bg-gray-700"></div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-[30px] sm:px-8 xl:px-2">
                    <MovieGridLayout>
                        {filteredDiscoverMovie.results.map((movie: Movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </MovieGridLayout>
                </div>

                <div className="relative mx-auto mb-20 mt-16 max-w-7xl px-4 sm:px-8 xl:px-2">
                    <div className="mx-auto h-10 w-64 rounded-md border-2 border-white bg-gray-700"></div>
                </div>
            </section>
        </main>
    );
}
