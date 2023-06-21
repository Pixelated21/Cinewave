import NavigationBar from "@/components/NavigationBar";
import {
    MovieCredits,
    MovieDetails,
    MovieVideoRequest,
} from "@/typescript/interfaces";
import axios from "axios";
import Image from "next/image";

const fetchMovieDetails = async ({ id }: { id: string | number }) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
            api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
        },
    });
    return res.data;
};

const fetchMovieCredits = async ({ id }: { id: string | number }) => {
    const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
            },
        }
    );
    return res.data;
};

const fetchMovieVideos = async ({ id }: { id: string | number }) => {
    const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        {
            params: {
                api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
            },
        }
    );
    return res.data;
};

export default async function MovieDetails({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    const detailsData: Promise<MovieDetails> = fetchMovieDetails({ id: id });
    const creditsData: Promise<MovieCredits> = fetchMovieCredits({ id: id });
    const videosData: Promise<MovieVideoRequest> = fetchMovieVideos({ id: id });

    const [details, credits, videos] = await Promise.all([
        detailsData,
        creditsData,
        videosData,
    ]);

    const filteredVideos = {
        ...videos,
        results: videos.results.filter(
            (video) =>
                video.type?.toLowerCase() === "trailer" &&
                video.official === true
        ),
    };

    return (
        <main className="h-screen overflow-y-auto bg-[#0E0410]">
            <section className="relative h-[571px] shadow-md xl:h-[671px]">
                <NavigationBar className="absolute z-10 w-full" />

                <div className="absolute h-full w-full">
                    <div className="relative flex h-full items-end">
                        <Image
                            className="absolute h-full w-full object-cover"
                            fill
                            src={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`}
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
                                src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
                                priority
                                alt="hero"
                            />
                        </div>
                        <div className="mt-7 flex flex-row items-center gap-x-7">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#200725]">
                                <span className="text-3xl font-bold text-white">
                                    {Number(details.vote_average).toPrecision(
                                        2
                                    )}
                                </span>
                            </div>
                            <div className="flex flex-col gap-y-2.5">
                                <div className=" flex flex-row items-end gap-x-1">
                                    <span className="text-sm font-semibold text-white">
                                        {details.vote_count}
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
                                {details.title}
                            </h1>
                            <div className="mt-2.5 text-xs">
                                <span>Original Title: </span>
                                <span>{details.original_title}</span>
                            </div>
                            <div className="mt-2.5 flex flex-row gap-x-2 text-sm font-semibold">
                                <div>Series (2017 - 2021)</div>
                                <div>5 Seasons</div>
                                <div>48 Episodes</div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-row gap-x-5">
                            <div className="w-32 rounded-sm bg-gray-500"></div>
                            <div className="h-10 w-10 rounded-full bg-gray-500"></div>
                            <div className="h-10 w-10 rounded-full bg-gray-500"></div>
                        </div>

                        <div className="mt-9 max-w-[608px]">
                            <p className="font-medium">{details.overview}</p>
                        </div>

                        <div className="mt-9">
                            <h1 className="text-xl font-bold">Details</h1>

                            <div className="mt-8 flex flex-col">
                                <div className="flex items-center gap-x-5 py-2">
                                    <span className="w-40 text-base">
                                        Genres
                                    </span>
                                    <span>
                                        {details.genres
                                            .map((genre) => genre.name)
                                            .join(", ")}
                                    </span>
                                </div>
                                <div className="flex items-center gap-x-5 py-2">
                                    <span className="w-40 text-base">
                                        Country of Origin
                                    </span>
                                    <span>Spain</span>
                                </div>
                                <div className="flex items-center gap-x-5 py-2">
                                    <span className="w-40 text-base">
                                        Runtime
                                    </span>
                                    <span>{details.runtime}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 hidden w-[300px] lg:block">
                        <h1 className="text-lg font-bold text-white">
                            Cast & Crew
                        </h1>
                        <div className="mt-8 flex flex-col gap-y-5">
                            {credits.cast?.splice(0, 4).map((cast) => (
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
            </section>
        </main>
    );
}
