import { DiscoverMovieAdvancedFilters, Movie, ResourceTypesEnum, Series } from "@/types";
import HeroSection from "@/components/sections/home/HeroSection";
import NavigationBar from "@/components/NavigationBar";
import ResourceListingSection from "@/components/sections/home/ResourceListingSection";
import {
    getComingSoonMoviesAction,
    getLatestMoviesAction,
    getPopularMoviesAction,
    getTrendingMoviesAction,
} from "../_actions/movie";
import { getLatestSeriesAction, getPopularSeriesAction } from "../_actions/series";

export default async function HomePage() {
    const getTrendingMovies = getTrendingMoviesAction();
    const getLatestMovies = getLatestMoviesAction({});
    const getLatestSeries = getPopularSeriesAction({ with_origin_country: "US" });
    const getComingSoonMovies = getComingSoonMoviesAction();
    const getPopularMovies = getPopularMoviesAction();

    const [trendingMovies, latestMovies, latestSeries, comingSoon, popularMovies] =
        await Promise.all([
            getTrendingMovies,
            getLatestMovies,
            getLatestSeries,
            getComingSoonMovies,
            getPopularMovies
        ]);

    latestSeries.results.filter((series: Series) => series.poster_path !== null && series.backdrop_path !== null);

    const filteredTrendingMovies = [...trendingMovies.results]
        .splice(0, 10)
        .filter(
            (movie) =>
                movie.poster_path !== null && movie.backdrop_path !== null
        );

    const filteredPopularMovies = [...popularMovies.results]
        .splice(0, 10)
        .filter(
            (movie) =>
                movie.poster_path !== null && movie.backdrop_path !== null
        );

    return (
        <main id="main-scrollbar" className=" h-screen overflow-y-auto">
            <NavigationBar className="bg-[#18181B] left-0 right-0 z-10 mx-auto w-full " />
            <section className="relative h-[300px] md:h-[450px] xl:h-[600px]">
                <HeroSection trending={filteredPopularMovies} />
            </section>

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
