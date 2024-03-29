import NavigationBar from "@/components/NavigationBar";
import MovieCard from "@/components/cards/movie/MovieCard";
import MovieGridLayout from "@/components/layouts/LayoutSection";
import { Movie } from "@/types";
import { getDiscoverMovieAction } from "@/actions/movie";
import PaginationControls from "@/components/pagination-controls";
import { generatePaginationConfig } from "@/lib/utils";

export default async function MoviePage({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined }
}) {
    const page: number = Number(searchParams['page']) ?? '1'

    const getDiscoverMovie = getDiscoverMovieAction(page);

    const [discoverMovie] = await Promise.all([getDiscoverMovie]);

    const paginationConfig = generatePaginationConfig({ current_page: page, total_pages: discoverMovie.total_pages, total_results: discoverMovie.total_results, resource: '/movie' })

    return (
        <main className="bg-[#18181B] overflow-auto">
            <NavigationBar className="bg-[#0e0e0f]" />
            <section className="overflow-hidden">
                <div className="relative mx-auto max-w-7xl px-4 py-[64px] sm:px-8 xl:px-2">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-xl font-semibold text-white opacity-20 sm:text-[32px] ">
                            Popular Movies
                        </h1>
                        {/* <Button className="border-2 border-white bg-gray-700">
                            Filter
                        </Button> */}
                    </div>
                </div>
            </section>

            <section className="bg-[#18181B]">
                <div className="relative mx-auto mb-8 mt-6 max-w-7xl px-4 sm:px-8 xl:px-2">
                    <PaginationControls config={paginationConfig} />
                </div>

                <div className="mx-auto max-w-7xl px-4 py-[30px] sm:px-8 xl:px-2">
                    <MovieGridLayout>
                        {discoverMovie.results.map((movie: Movie) => (
                            <MovieCard key={movie.id} resource={movie} />
                        ))}
                    </MovieGridLayout>
                </div>

                <div className="relative mx-auto mb-20 mt-16 max-w-7xl px-4 sm:px-8 xl:px-2">
                    <PaginationControls config={paginationConfig} />
                </div>
            </section>
        </main >
    );
}
