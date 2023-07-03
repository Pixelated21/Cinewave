import { DiscoverMovieAdvancedFilters, Movie, ResourceTypesEnum } from "@/types";
import HeroSection from "@/components/sections/HeroSection";
import NavigationBar from "@/components/NavigationBar";
import ResourceListingSection from "@/components/sections/home/ResourceListingSection";
import {
    getComingSoonMoviesAction,
    getLatestMoviesAction,
    getTrendingMoviesAction,
} from "../_actions/movie";
import { getLatestSeriesAction } from "../_actions/series";

export default async function HomePage({
    searchParams,
}: {
    searchParams: DiscoverMovieAdvancedFilters;
}) {
    const getTrendingMovies = getTrendingMoviesAction();
    const getLatestMovies = getLatestMoviesAction({
        filter: { ...searchParams },
    });
    const getLatestSeries = getLatestSeriesAction({
        filter: { ...searchParams },
    });
    const getComingSoonMovies = getComingSoonMoviesAction();

    const [trendingMovies, latestMovies, latestSeries, comingSoon] =
        await Promise.all([
            getTrendingMovies,
            getLatestMovies,
            getLatestSeries,
            getComingSoonMovies,
        ]);

    const filteredTrendingMovies = [...trendingMovies.results]
        .splice(0, 10)
        .filter(
            (movie: Movie) =>
                movie.poster_path !== null && movie.backdrop_path !== null
        );

    return (
        <main className=" h-screen overflow-y-auto">
            <div className="relative h-[571px] shadow-md xl:h-[671px]">
                <NavigationBar className="absolute left-0 right-0 z-10 mx-auto w-full max-w-7xl" />
                <HeroSection trending={filteredTrendingMovies} />
            </div>

            {/* Trending */}
            <ResourceListingSection
                type={ResourceTypesEnum.MOVIE}
                resource={trendingMovies}
                title={"Trending"}
            />

            {/* Latest Movies */}
            <ResourceListingSection
                type={ResourceTypesEnum.MOVIE}
                resource={latestMovies}
                title={"Latest Movies"}
            />

            {/* Latest TV Show */}
            <ResourceListingSection
                type={ResourceTypesEnum.SERIES}
                resource={latestSeries}
                title={"Latest TV Shows"}
            />

            {/* Coming Soon */}
            <ResourceListingSection
                type={ResourceTypesEnum.MOVIE}
                resource={comingSoon}
                title={"Coming Soon"}
            />
        </main>
    );
}
