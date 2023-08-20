import {
    getSeriesCreditsAction,
    getSeriesDetailsAction,
    getSeriesRecommendationsAction,
    getSeriesVideosAction,
    getTrendingSeriesAction,
} from "@/app/_actions/series";
import NavigationBar from "@/components/NavigationBar";
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
import Badge from "@/components/badges/Badge";
import { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    const id = params.id;

    const getSeriesDetails: Promise<SeriesDetails> = getSeriesDetailsAction({
        id: id,
    });

    const [seriesDetails] = await Promise.all([getSeriesDetails]);

    return {
        title: `${seriesDetails.name ?? seriesDetails.original_name} | CineWave`,
        description: seriesDetails.overview,
        keywords: [
            seriesDetails.name ?? seriesDetails.original_name,
            ...seriesDetails.genres.map((g) => g.name),
            "series",
        ],
        openGraph: {
            siteName: "CineWave",
            type: "website",
            locale: "en_US",
            images: `${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL}/original/${seriesDetails.poster_path}`,
            name: `${seriesDetails.name ?? seriesDetails.original_name} | CineWave`,
            description: seriesDetails.overview,
            url: `https://cinewave.vercel.app/series/${id}`,
        },

        twitter: {
            name: `${seriesDetails.name ?? seriesDetails.original_name} | CineWave`,
            description: seriesDetails.overview,
            card: "player",
        },
    };
}

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
        <main id="main-scrollbar" className="h-screen overflow-y-auto bg-[#18181B]">
            <section className="relative h-[571px] shadow-md xl:h-[671px]">
                <NavigationBar className="absolute z-10 w-full bg-gray-800 md:bg-transparent md:hover:backdrop-blur-md md:backdrop-blur-none md:duration-500 md:delay-1000 md:hover:delay-300" />

                <div className="absolute h-full w-full">

                    <div className="relative flex h-full items-end blur-xl md:blur-none duration-300">
                        <Image
                            className="absolute h-full w-full object-cover "
                            height={671}
                            width={1280}
                            src={`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL}/original/${seriesDetails.backdrop_path}`}
                            priority
                            alt={`Backdrop of: ${seriesDetails.name} | CineWave`}
                        />
                        <div className="absolute h-full w-full bg-black bg-opacity-50"></div>
                        <div className="absolute h-80 w-full bg-gradient-to-b -bottom-2 from-[#18181B]/0 to-[#18181B]"></div>
                    </div>
                </div>
            </section>

            <section className="container relative z-10 -mt-[440px] md:-mt-60 mb-20 px-0 sm:px-10">
                <div className="flex h-full justify-center sm:justify-start flex-col md:flex-row">
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="relative h-[250px] w-[150px] md:h-[350px] md:w-[200px] rounded-sm xl:h-[400px] xl:w-[250px] 2xl:h-[400px] 2xl:w-[300px] duration-300">
                            <Image
                                className="absolute rounded-sm object-cover"
                                height={450}
                                width={300}
                                sizes=""
                                src={`https://image.tmdb.org/t/p/w500/${seriesDetails.poster_path}`}
                                priority
                                alt={`Poster of: ${seriesDetails.name} | CineWave`}
                            />
                            {seriesDetails.adult && (
                                <div className="absolute top-2.5 left-2.5 md:top-4 md:left-4 bg-orange-600 px-1.5 py-0.5 md:px-2 md:py-0.5 text-xs md:text-sm rounded-md text-white font-semibold">18+</div>
                            )}
                        </div>
                        {/* <div className="mt-7 flex flex-row items-center gap-x-7">
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
                        </div> */}
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

                        {/* <div className="mt-6 flex flex-row gap-x-5">
                            <div className="h-10 w-10 rounded-full bg-gray-500"></div>
                            <div className="h-10 w-10 rounded-full bg-gray-500"></div>
                        </div> */}

                        <div className="mt-9 max-w-[608px]">
                            <p className="font-medium">
                                {seriesDetails.overview}
                            </p>
                        </div>

                        <div className="mt-9">
                            <h1 className="text-xl font-bold">Details</h1>

                            <div className="mt-8 flex flex-col">
                                {seriesDetails.genres.length > 0 && (
                                    <div className="flex items-center gap-x-5 py-2">
                                        <span className="w-48 text-base">
                                            Genres
                                        </span>
                                        <div className="flex flex-1 flex-wrap gap-1">
                                            {seriesDetails.genres.map(
                                                (genre) => {
                                                    {
                                                        return (
                                                            <Badge
                                                                key={genre.id}
                                                                text={
                                                                    genre.name
                                                                }
                                                            />
                                                        );
                                                    }
                                                }
                                            )}
                                        </div>
                                    </div>
                                )}

                                {seriesDetails.production_companies.length >
                                    0 && (
                                        <div className="flex items-center gap-x-5 py-2">
                                            <span className="w-48 text-base">
                                                Production Companies
                                            </span>
                                            <div className="flex flex-1 flex-wrap gap-1">
                                                {seriesDetails.production_companies.map(
                                                    (companies) => {
                                                        return (
                                                            <Badge
                                                                key={companies.id}
                                                                text={
                                                                    companies.name
                                                                }
                                                            />
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    )}

                                {seriesDetails.production_countries.length >
                                    0 && (
                                        <div className="flex items-center gap-x-5 py-2">
                                            <span className="w-48 text-base">
                                                Production Countries
                                            </span>
                                            <div className="flex flex-1 flex-wrap gap-1">
                                                {seriesDetails.production_countries.map(
                                                    (countries) => {
                                                        return (
                                                            <Badge
                                                                key={
                                                                    countries.iso_3166_1
                                                                }
                                                                text={
                                                                    countries.name
                                                                }
                                                            />
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    )}
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
                                            <div className="relative h-14 w-14 overflow-hidden rounded-full">
                                                <Image
                                                    className="absolute rounded-full bg-white object-cover"
                                                    fill
                                                    src={`${cast.profile_path
                                                        ? `https://image.tmdb.org/t/p/w92/${cast.profile_path}`
                                                        : "/assets/profile_default.png"
                                                        }`}
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
                            {/* <div className="mt-5 flex flex-row items-center gap-x-2">
                                <span className="text-sm font-semibold text-white">
                                    Show more
                                </span>
                                <div className="h-5 w-5 rounded-full bg-white"></div>
                            </div> */}
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

                        {filteredRecommendations.length > 0 && (
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
                        )}
                    </div>

                    {filteredTrending.length > 0 && (
                        <div className="flex flex-col gap-y-8">
                            <div className="flex flex-col">
                                <h1 className=" text-3xl font-semibold text-white">
                                    Popular
                                </h1>
                                <div className="mt-5 w-[300px] bg-gray-900 p-5 ">
                                    <div className="divide- flex flex-col gap-y-4">
                                        {filteredTrending.map(
                                            (series: Series) => (
                                                <div
                                                    className=""
                                                    key={series.id}
                                                >
                                                    <SmallSeriesCard
                                                        resource={series}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
