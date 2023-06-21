import NavigationBar from "@/components/NavigationBar";
import MovieCard from "@/components/cards/MovieCard";
import MovieGridLayout from "@/components/layouts/MovieGridLayout";
import { Button } from "@/components/ui/button";
import { formatSearchQuery } from "@/lib/utils";
import { Movie } from "@/typescript/interfaces";
import axios from "axios";

const fetchDiscoverSeries = async () => {
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

export default async function SeriesPage() {
    const discoverSeriesData = await fetchDiscoverSeries();

    const filteredDiscoverSeries = {
        ...discoverSeriesData,
        results: [
            ...discoverSeriesData.results.filter(
                (movie: Movie) => movie.poster_path
            ),
        ],
    };

    return (
        <main className="h-screen overflow-y-auto bg-[#18181B]">
            <NavigationBar className="primary" />
            <section className="overflow-hidden">
                <div className="relative mx-auto max-w-7xl px-4 py-[64px] sm:px-8 xl:px-2">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-xl font-semibold text-white opacity-20 sm:text-[32px] ">
                            Popular TV Shows
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
                        {filteredDiscoverSeries.results.map((movie: Movie) => (
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
