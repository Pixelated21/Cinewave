import {
    getMovieCreditsAction,
    getMovieDetailsAction,
    getMovieRecommendationsAction,
    getMovieVideosAction,
    getTrendingMoviesAction,
} from "@/app/_actions/movie";
import NavigationBar from "@/components/NavigationBar";
import MovieCardBlurEffect from "@/components/cards/movie/MovieCardBlurEffect";
import SmallMovieCard from "@/components/cards/movie/SmallMovieCard";
import { genres } from "@/data/genres";
import { getGenres } from "@/lib/utils";
import { Credits, Movie, MovieDetails, MovieVideoRequest } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import Badge from "@/components/badges/Badge";

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    const id = params.id;

    const getMovieDetails: Promise<MovieDetails> = getMovieDetailsAction({
        id: id,
    });

    const [movieDetails] = await Promise.all([getMovieDetails]);

    return {
        title: `${movieDetails.title} | CineWave`,
        description: movieDetails.overview,
        keywords: [
            movieDetails.title,
            ...movieDetails.genres.map((g) => g.name),
            "movies",
        ],
        openGraph: {
            siteName: "CineWave",
            type: "website",
            locale: "en_US",
            images: `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`,
            title: `${movieDetails.title} | CineWave`,
            description: movieDetails.overview,
            url: `https://cinewave.vercel.app/movie/${id}`,
        },

        twitter: {
            title: `${movieDetails.title} | CineWave`,
            description: movieDetails.overview,
            card: "player",
        },
    };
}

export default async function MovieDetails({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    const getMovieDetails: Promise<MovieDetails> = getMovieDetailsAction({
        id: id,
    });
    const getMovieCredits: Promise<Credits> = getMovieCreditsAction({ id: id });
    const getMovieVideos: Promise<MovieVideoRequest> = getMovieVideosAction({
        id: id,
    });
    const getMovieRecommendations = getMovieRecommendationsAction({ id: id });
    const getTrendingMovies = getTrendingMoviesAction();

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

    const filteredRecommendations = movieRecommendations.results
        .filter((movie: Movie) => movie.backdrop_path !== null)
        .map(({ genre_ids, ...movie }: { genre_ids: string[] }) => {
            const genre = getGenres(genre_ids!, genres);
            return { ...movie, genre_ids: genre };
        });

    return (
        <main id="main" className="h-screen overflow-y-auto bg-[#0E0410]">
            <section className="relative h-[571px] shadow-md xl:h-[671px]">
                <NavigationBar className="absolute z-10 w-full hover:backdrop-blur-md backdrop-blur-none duration-500 delay-1000 hover:delay-300" />

                <div className="absolute h-full w-full">

                    <div className="relative flex h-full items-end ">
                        <Image
                            className="absolute h-full w-full object-cover"
                            height={671}
                            width={1280}
                            src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
                            priority
                            alt={`Backdrop of: ${movieDetails.title} | CineWave`}
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
                                height={450}
                                width={300}
                                sizes=""
                                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                                priority
                                alt={`Poster of: ${movieDetails.title} | CineWave`}
                            />
                        </div>
                        {/* <div className="mt-7 flex flex-row items-center gap-x-7">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#200725]">
                                <span className="text-3xl font-bold text-white">
                                    {Number(
                                        movieDetails.vote_average
                                    ).toPrecision(2)}
                                </span>
                            </div>
                            <div className="flex flex-col gap-y-2.5">
                                <div className=" flex flex-row items-center  gap-x-1">
                                    <span className="text-sm font-semibold text-white">
                                        {movieDetails.vote_count}
                                    </span>
                                    <span className="text-xs text-gray-200">
                                        Ratings
                                    </span>
                                </div>
                                <div className=" flex flex-row items-center gap-x-1">
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
                                {movieDetails.title}
                            </h1>
                            {movieDetails.original_title !==
                                movieDetails.title && (
                                    <div className="mt-2.5 text-xs">
                                        <span>Original Title: </span>
                                        <span>{movieDetails.original_title}</span>
                                    </div>
                                )}

                            <div className="mt-2.5 flex flex-row gap-x-2 text-sm font-semibold">
                                <div>Movie ({movieDetails.release_date})</div>
                            </div>
                        </div>

                        <div className="mt-2 flex flex-row gap-x-5">
                            {/* <div className="h-10 w-10 rounded-full bg-gray-500"></div>
                            <div className="h-10 w-10 rounded-full bg-gray-500"></div> */}
                        </div>

                        <div className="mt-9 max-w-[608px]">
                            <p className="font-medium">
                                {movieDetails.overview}
                            </p>
                        </div>

                        <div className="mt-9">
                            <h1 className="text-xl font-bold">Details</h1>

                            <div className="mt-8 flex flex-col divide-y-2 divide-gray-700/20">
                                {movieDetails.genres.length > 0 && (
                                    <div className="flex items-center gap-x-5 py-2">
                                        <div className="w-48 text-base">
                                            Genres
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {movieDetails.genres.map(
                                                (genre) => {
                                                    return (
                                                        <Badge
                                                            key={genre.id}
                                                            text={genre.name}
                                                        />
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                )}

                                {movieDetails.production_companies.length >
                                    0 && (
                                        <div className="flex items-center gap-x-5 py-2">
                                            <div className="w-48 text-base">
                                                Production Companies
                                            </div>
                                            <div className="flex flex-1 flex-wrap gap-1">
                                                {movieDetails.production_companies.map(
                                                    (company) => {
                                                        return (
                                                            <Badge
                                                                key={company.id}
                                                                text={company.name}
                                                            />
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    )}

                                {movieDetails.production_countries.length >
                                    0 && (
                                        <div className="flex items-center gap-x-5 py-2 ">
                                            <div className="w-48 text-base">
                                                Production Countries
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {movieDetails.production_countries.map(
                                                    (country) => {
                                                        return (
                                                            <Badge
                                                                key={
                                                                    country.iso_3166_1
                                                                }
                                                                text={country.name}
                                                            />
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    )}

                                {movieDetails.runtime > 0 && (
                                    <div className="flex items-center gap-x-5 py-2">
                                        <div className="w-48 text-base">
                                            Runtime
                                        </div>
                                        <Badge
                                            text={`${movieDetails.runtime} m`}
                                        />
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
                                {movieCredits.cast?.splice(0, 4).map((cast) => (
                                    <div
                                        // href={`/person/${cast.id}`}
                                        // href={'#'}
                                        key={cast.id}
                                        className="flex items-center gap-x-4"
                                    >
                                        <div className="relative h-14 w-14 overflow-hidden rounded-full">
                                            <Image
                                                className="absolute rounded-full bg-white object-cover"
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                src={`${cast.profile_path
                                                    ? `https://image.tmdb.org/t/p/w92/${cast.profile_path}`
                                                    : "/assets/profile_default.png"
                                                    }`}
                                                alt={`Profile Photo of: ${cast.name} | CineWave`}
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

                        {movieDetails.belongs_to_collection && (
                            <div className="flex flex-col">
                                <div className="mt-5">
                                    <div className=" flex w-[211px] flex-col gap-y-4">
                                        <div className="relative  h-80 overflow-hidden rounded-sm">
                                            <Image
                                                alt={`Collection Poster of: ${movieDetails.belongs_to_collection.name} | CineWave`}
                                                className="absolute object-cover"
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                src={`https://image.tmdb.org/t/p/w500/${movieDetails.belongs_to_collection.poster_path}`}
                                            />
                                        </div>
                                        <div
                                            // href={`/collection/${movieDetails.belongs_to_collection.id}`}
                                            className="text-white duration-300 hover:text-purple-400"
                                        >
                                            <p className="text-center text-base font-semibold ">
                                                {
                                                    movieDetails
                                                        .belongs_to_collection
                                                        .name
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="container mb-20">
                <div className="flex flex-row gap-x-10">
                    <div className="flex flex-1 flex-col gap-y-10">
                        {/* {filteredVideos.results.length > 0 && (
                            <TrailerSection trailers={filteredVideos.results} />
                        )} */}

                        {filteredRecommendations.length > 0 && (
                            <div className="flex flex-col">
                                <h1 className=" text-3xl font-semibold text-white">
                                    More Like This
                                </h1>
                                <div className="mt-5 h-full">
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                                        {filteredRecommendations.map(
                                            (movie: Movie) => (
                                                <MovieCardBlurEffect
                                                    key={movie.id}
                                                    resource={movie}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className=" hidden lg:flex flex-col gap-y-8 ">
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
