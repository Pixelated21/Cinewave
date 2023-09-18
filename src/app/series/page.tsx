import NavigationBar from "@/components/NavigationBar";
import MovieCard from "@/components/cards/movie/MovieCard";
import MovieGridLayout from "@/components/layouts/LayoutSection";
import { Button } from "@/components/ui/button";
import { Movie, Series } from "@/types";
import { getDiscoverSeriesAction } from "../_actions/series";
import SeriesCard from "@/components/cards/series/SeriesCard";
import { generatePaginationConfig } from "@/lib/utils";
import PaginationControls from "@/components/pagination-controls";

export default async function SeriesPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const page: number = Number(searchParams['page']) ?? '1'

    const getDiscoverSeries = await getDiscoverSeriesAction(page);

    const [discoverSeries] = await Promise.all([getDiscoverSeries]);

    const paginationConfig = generatePaginationConfig({ current_page: page, total_pages: discoverSeries.total_pages, total_results: discoverSeries.total_results, resource: `/series` })

    const filteredDiscoverSeries = {
        ...discoverSeries,
        results: [
            ...discoverSeries.results.filter(
                (series: Series) => series.poster_path
            ),
        ],
    };


    return (
        <main className="h-screen overflow-y-auto bg-[#18181B]">
            <NavigationBar className="bg-[#0e0e0f]" />
            <section className="overflow-hidden">
                <div className="relative mx-auto max-w-7xl px-4 py-[64px] sm:px-8 xl:px-2">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-xl font-semibold text-white opacity-20 sm:text-[32px] ">
                            Popular TV Shows
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
                        {filteredDiscoverSeries.results.map((series: Series) => (
                            <SeriesCard key={series.id} resource={series} />
                        ))}
                    </MovieGridLayout>
                </div>

                <div className="relative mx-auto mb-20 mt-16 max-w-7xl px-4 sm:px-8 xl:px-2">
                    <PaginationControls config={paginationConfig} />
                </div>
            </section>
        </main>
    );
}
