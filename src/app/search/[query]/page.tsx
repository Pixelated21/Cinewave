import { multiSearchAction } from "@/app/_actions/search";
import NavigationBar from "@/components/NavigationBar";
import MovieCardBlurEffect from "@/components/cards/movie/MovieCardBlurEffect";
import SeriesCardBlurEffect from "@/components/cards/series/SeriesCardBlurEffect";
import MovieGridLayout from "@/components/layouts/LayoutSection";
import PaginationControls from "@/components/pagination-controls";
import { formatSearchQuery, generatePaginationConfig } from "@/lib/utils";
import { Movie } from "@/types";

export default async function SearchPage({
    params,
    searchParams
}: {
    params: { query: string };
    searchParams: { [key: string]: string | undefined };
}) {
    const { query } = params;

    const page: number = Number(searchParams['page']) ?? '1'

    const sanitizedQuery = formatSearchQuery(query, false);

    const getSearchResults = multiSearchAction({ term: sanitizedQuery, page: page });

    const [searchResults] = await Promise.all([getSearchResults]);

    const paginationConfig = generatePaginationConfig({ current_page: page, total_pages: searchResults.total_pages, total_results: searchResults.total_results, resource: `/search/${sanitizedQuery}` })

    const filteredSearchResults = {
        ...searchResults.results,
        results: [
            // FIXME: Fix type hinting
            // @ts-ignore
            ...searchResults?.results?.filter(
                // @ts-ignore
                (resource) => resource.poster_path
            ),
        ],
    };

    return (
        <main className="overflow-y-auto bg-[#18181B]">
            <NavigationBar className="bg-[#0e0e0f]" />
            <section className="overflow-hidden">
                <div className="relative mx-auto max-w-7xl px-4 py-[64px] sm:px-8 xl:px-2">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-xl font-semibold text-white opacity-20 sm:text-[32px] ">
                            Search results for “{sanitizedQuery}”
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
                        {filteredSearchResults.results.map((movie: Movie) => (
                            <>
                                {/* @ts-ignore */}
                                {movie.media_type === "movie" ? (
                                    <MovieCardBlurEffect
                                        key={movie.id}
                                        resource={movie}
                                    />
                                ) : (
                                    <SeriesCardBlurEffect
                                        key={movie.id}
                                        // @ts-ignore
                                        resource={movie}
                                    />
                                )}
                            </>
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
