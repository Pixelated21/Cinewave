import {
    getSeriesCreditsAction,
    getSeriesDetailsAction,
    getSeriesRecommendationsAction,
    getSeriesVideosAction,
    getTrendingSeriesAction,
} from "@/app/_actions/series";
import NavigationBar from "@/components/NavigationBar";
import MovieCardBlurEffect from "@/components/cards/movie/MovieCardBlurEffect";
import SmallMovieCard from "@/components/cards/series/SmallSeriesCard";
import TrailerCard from "@/components/cards/TrailerCard";
import { genres } from "@/data/genres";
import { getGenres } from "@/lib/utils";
import {
    Credits,
    Movie,
    MovieVideoRequest,
    Series,
    SeriesDetails,
} from "@/types";
import Image from "next/image";
import SmallSeriesCard from "@/components/cards/series/SmallSeriesCard";
import SeriesCardBlurEffect from "@/components/cards/series/SeriesCardBlurEffect";

export default async function seriesDetails({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    const getSeriesDetails: Promise<SeriesDetails> = getSeriesDetailsAction({
        id: id,
    });
    const getSeriesCredits: Promise<Credits> = getSeriesCreditsAction({
        id: id,
    });
    const getSeriesVideos: Promise<MovieVideoRequest> = getSeriesVideosAction({
        id: id,
    });
    const getTrendingSeries = getTrendingSeriesAction();
    const getSeriesRecommendations = getSeriesRecommendationsAction({ id: id });

    const [
        seriesDetails,
        seriesCredits,
        seriesVideos,
        trendingSeries,
        seriesRecommendations,
    ] = await Promise.all([
        getSeriesDetails,
        getSeriesCredits,
        getSeriesVideos,
        getTrendingSeries,
        getSeriesRecommendations,
    ]);

    const filteredVideos = {
        ...seriesVideos,
        results: seriesVideos.results.filter(
            (video) =>
                video.type?.toLowerCase() === "trailer" &&
                video.official === true
        ),
    };

    const filteredTrending = trendingSeries.results
        .splice(0, 10)
        .filter(
            (series: Series) =>
                series.poster_path !== null && series.backdrop_path !== null
        );

    // FIXME: Fix Type Hinting
    const filteredRecommendations = seriesRecommendations.results
        .filter((series: Series) => series.backdrop_path !== null)
        .map(({ genre_ids, ...series }: { genre_ids: any }) => {
            const genre = getGenres(genre_ids!, genres);
            return { ...series, genre_ids: genre };
        });

    return (
        <main className="h-screen overflow-y-auto bg-[#0E0410]">
            <section className="relative h-[571px] shadow-md xl:h-[671px]">
                <NavigationBar className="absolute z-10 w-full" />

                <div className="absolute h-full w-full">
                    <div className="relative flex h-full items-end">
                        <Image
                            className="absolute h-full w-full object-cover"
                            fill
                            src={`https://image.tmdb.org/t/p/original/${seriesDetails.backdrop_path}`}
                            priority
                            alt="hero"
                        />
                        <div className="absolute h-full w-full bg-black bg-opacity-50"></div>
                        <div className="absolute h-80 w-full bg-gradient-to-b from-[#0E0410]/0 to-[#0E0410]"></div>
                    </div>
                </div>
            </section>

            <section className="container relative z-10 -mt-60 mb-20 px-10">
                <div className="flex h-full flex-row">
                    <div className="flex flex-col">
                        <div className="relative h-[400px] w-[250px] rounded-sm xl:h-[450px] xl:w-[300px]">
                            <Image
                                className="absolute rounded-sm object-cover"
                                fill
                                src={`https://image.tmdb.org/t/p/w500/${seriesDetails.poster_path}`}
                                priority
                                alt="hero"
                            />
                        </div>
                        <div className="mt-7 flex flex-row items-center gap-x-7">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#200725]">
                                <span className="text-3xl font-bold text-white">
                                    {Number(
                                        seriesDetails.vote_average
                                    ).toPrecision(2)}
                                </span>
                            </div>
                            <div className="flex flex-col gap-y-2.5">
                                <div className=" flex flex-row items-end gap-x-1">
                                    <span className="text-sm font-semibold text-white">
                                        {seriesDetails.vote_count}
                                    </span>
                                    <span className="text-xs text-gray-200">
                                        Ratings
                                    </span>
                                </div>
                                <div className=" flex flex-row items-end gap-x-1">
                                    <span className="text-sm font-semibold text-white">
                                        {84}
                                    </span>
                                    <span className="text-xs text-gray-200">
                                        Reviews
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" flex-1 px-10 text-white">
                        <div className="mt-8 flex flex-col">
                            <h1 className="text-4xl font-bold xl:text-5xl">
                                {seriesDetails.name}
                            </h1>
                            {seriesDetails.original_name !==
                                seriesDetails.name && (
                                <div className="mt-2.5 text-xs">
                                    <span>Original Title: </span>
                                    <span>{seriesDetails.original_name}</span>
                                </div>
                            )}
                            <div className="mt-2.5 flex flex-row gap-x-2 text-sm font-semibold">
                                <div>
                                    Series ({seriesDetails.first_air_date} -{" "}
                                    {seriesDetails.last_air_date})
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-row gap-x-5">
                            <div className="h-10 w-10 rounded-full bg-gray-500"></div>
                            <div className="h-10 w-10 rounded-full bg-gray-500"></div>
                        </div>

                        <div className="mt-9 max-w-[608px]">
                            <p className="font-medium">
                                {seriesDetails.overview}
                            </p>
                        </div>

                        <div className="mt-9">
                            <h1 className="text-xl font-bold">Details</h1>

                            <div className="mt-8 flex flex-col">
                                <div className="flex items-center gap-x-5 py-2">
                                    <span className="w-44 text-base">
                                        Genres
                                    </span>
                                    <span>
                                        {seriesDetails.genres
                                            .map((genre) => genre.name)
                                            .join(", ")}
                                    </span>
                                </div>
                                <div className="flex items-center gap-x-5 py-2">
                                    <span className="w-44 text-base">
                                        Production Companies
                                    </span>
                                    <span>
                                        {seriesDetails.production_companies
                                            .map((companies) => companies.name)
                                            .join(", ")}
                                    </span>
                                </div>
                                <div className="flex items-center gap-x-5 py-2">
                                    <span className="w-44 text-base">
                                        Production Countries
                                    </span>
                                    <span>
                                        {seriesDetails.production_countries
                                            .map((countries) => countries.name)
                                            .join(", ")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-[300px] flex-col gap-y-8">
                        <div className="mt-8 hidden  lg:block">
                            <h1 className="text-lg font-bold text-white">
                                Cast & Crew
                            </h1>
                            <div className="mt-8 flex flex-col gap-y-5">
                                {seriesCredits.cast
                                    ?.splice(0, 4)
                                    .map((cast) => (
                                        <div
                                            key={cast.id}
                                            className="flex items-center gap-x-4"
                                        >
                                            <div className="relative h-14 w-14 rounded-full">
                                                <Image
                                                    className="absolute rounded-full object-cover"
                                                    fill
                                                    src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                                                    priority
                                                    alt="hero"
                                                />
                                            </div>
                                            <div className="flex flex-col text-white">
                                                <span className="text-sm font-bold">
                                                    {cast.name}
                                                </span>
                                                <span className="text-xs font-normal">
                                                    {cast.character}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="mt-5 flex flex-row items-center gap-x-2">
                                <span className="text-sm font-semibold text-white">
                                    Show more
                                </span>
                                <div className="h-5 w-5 rounded-full bg-white"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mb-20">
                <div className="flex flex-row gap-x-10">
                    <div className="flex flex-1 flex-col gap-y-10">
                        {filteredVideos.results.length < 0 && (
                            <div className="flex flex-col">
                                <h1 className=" text-3xl font-semibold text-white">
                                    Trailers
                                </h1>
                                <div className="mt-5 h-full">
                                    <div className="grid grid-cols-3 gap-5">
                                        {filteredVideos.results.map(
                                            (trailer) => (
                                                <TrailerCard
                                                    key={trailer.id}
                                                    video={trailer}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col">
                            <h1 className=" text-3xl font-semibold text-white">
                                More Like This
                            </h1>
                            <div className="mt-5 h-full">
                                <div className="grid grid-cols-3 gap-5">
                                    {filteredRecommendations.map(
                                        (series: Series) => (
                                            <SeriesCardBlurEffect
                                                key={series.id}
                                                resource={series}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-8">
                        <div className="flex flex-col">
                            <h1 className=" text-3xl font-semibold text-white">
                                Popular
                            </h1>
                            <div className="mt-5 w-[300px] bg-gray-900 p-5 ">
                                <div className="divide- flex flex-col gap-y-4">
                                    {filteredTrending.map((series: Series) => (
                                        <div className="" key={series.id}>
                                            <SmallSeriesCard
                                                resource={series}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
