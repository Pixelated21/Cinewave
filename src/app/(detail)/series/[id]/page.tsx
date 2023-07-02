import {
    getMovieCreditsAction,
    getMovieDetailsAction,
    getMovieRecommendationsAction,
    getMovieVideosAction,
    getTrendingMoviesAction,
} from "@/app/_actions/movie";
import NavigationBar from "@/components/NavigationBar";
import MovieCardBlurEffect from "@/components/cards/MovieCardBlurEffect";
import SmallMovieCard from "@/components/cards/SmallMovieCard";
import TrailerCard from "@/components/cards/TrailerCard";
import { genres } from "@/data/genres";
import { getGenres } from "@/lib/utils";
import {
    Credits,
    Movie,
    MovieDetails,
    MovieVideoRequest,
    SeriesDetails,
} from "@/types";
import Image from "next/image";

export default async function MovieDetails({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    const getMovieDetails: Promise<SeriesDetails> = getMovieDetailsAction({
        id: id,
    });
    const getMovieCredits: Promise<Credits> = getMovieCreditsAction({ id: id });
    const getMovieVideos: Promise<MovieVideoRequest> = getMovieVideosAction({
        id: id,
    });
    const getTrendingMovies = getTrendingMoviesAction();
    const getMovieRecommendations = getMovieRecommendationsAction({ id: id });

    const [
        movieDetails,
        movieCredits,
        movieVideos,
        trendingMovies,
        movieRecommendations,
    ] = await Promise.all([
        getMovieDetails,
        getMovieCredits,
        getMovieVideos,
        getTrendingMovies,
        getMovieRecommendations,
    ]);

    const filteredVideos = {
        ...movieVideos,
        results: movieVideos.results.filter(
            (video) =>
                video.type?.toLowerCase() === "trailer" &&
                video.official === true
        ),
    };

    const filteredTrending = trendingMovies.results
        .splice(0, 10)
        .filter(
            (movie: Movie) =>
                movie.poster_path !== null && movie.backdrop_path !== null
        );

    // FIXME: Fix Type Hinting
    const filteredRecommendations = movieRecommendations.results
        .filter((movie: Movie) => movie.backdrop_path !== null)
        .map(({ genre_ids, ...movie }: { genre_ids: any }) => {
            const genre = getGenres(genre_ids!, genres);
            return { ...movie, genre_ids: genre };
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
                            src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
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
                                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                                priority
                                alt="hero"
                            />
                        </div>
                        <div className="mt-7 flex flex-row items-center gap-x-7">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#200725]">
                                <span className="text-3xl font-bold text-white">
                                    {Number(
                                        movieDetails.vote_average
                                    ).toPrecision(2)}
                                </span>
                            </div>
                            <div className="flex flex-col gap-y-2.5">
                                <div className=" flex flex-row items-end gap-x-1">
                                    <span className="text-sm font-semibold text-white">
                                        {movieDetails.vote_count}
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
                                {movieDetails.name}
                            </h1>
                            {movieDetails.original_name !==
                                movieDetails.name && (
                                <div className="mt-2.5 text-xs">
                                    <span>Original Title: </span>
                                    <span>{movieDetails.original_name}</span>
                                </div>
                            )}
                            <div className="mt-2.5 flex flex-row gap-x-2 text-sm font-semibold">
                                <div>
                                    Movie ({movieDetails.first_air_date} -{" "}
                                    {movieDetails.last_air_date})
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-row gap-x-5">
                            <div className="h-10 w-10 rounded-full bg-gray-500"></div>
                            <div className="h-10 w-10 rounded-full bg-gray-500"></div>
                        </div>

                        <div className="mt-9 max-w-[608px]">
                            <p className="font-medium">
                                {movieDetails.overview}
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
                                        {movieDetails.genres
                                            .map((genre) => genre.name)
                                            .join(", ")}
                                    </span>
                                </div>
                                <div className="flex items-center gap-x-5 py-2">
                                    <span className="w-44 text-base">
                                        Production Companies
                                    </span>
                                    <span>
                                        {movieDetails.production_companies
                                            .map((companies) => companies.name)
                                            .join(", ")}
                                    </span>
                                </div>
                                <div className="flex items-center gap-x-5 py-2">
                                    <span className="w-44 text-base">
                                        Production Countries
                                    </span>
                                    <span>
                                        {movieDetails.production_countries
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
                                {movieCredits.cast?.splice(0, 4).map((cast) => (
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
                                        (movie: Movie) => (
                                            <MovieCardBlurEffect
                                                key={movie.id}
                                                resource={movie}
                                                type="series"
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
                                    {filteredTrending.map((movie: Movie) => (
                                        <div className="" key={movie.id}>
                                            <SmallMovieCard movie={movie} />
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
