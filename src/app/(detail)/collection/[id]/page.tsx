import { getCollectionDetailsAction } from "@/app/_actions/collection";
import { getTrendingMoviesAction } from "@/app/_actions/movie";
import NavigationBar from "@/components/NavigationBar";
import MovieCardBlurEffect from "@/components/cards/movie/MovieCardBlurEffect";
import SmallMovieCard from "@/components/cards/movie/SmallMovieCard";
import { Collection, Movie, Part } from "@/types";
import Image from "next/image";

export default async function CollectionPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    const getCollectionDetails: Promise<Collection> =
        getCollectionDetailsAction({ id: id });
    const getTrendingMovies = getTrendingMoviesAction();

    const [collectionDetails, trendingMovie] = await Promise.all([
        getCollectionDetails,
        getTrendingMovies,
    ]);

    const filteredTrendingMovie = trendingMovie.results
        .splice(0, 10)
        .filter(
            (movie: Movie) =>
                movie.poster_path !== null && movie.backdrop_path !== null
        );

    return (
        <main className="h-screen overflow-y-auto bg-[#0E0410]">
            <section className="relative h-[571px] shadow-md xl:h-[671px]">
                <NavigationBar className="absolute z-10 w-full" />

                <div className="absolute h-full w-full">
                    <div className="relative flex h-full items-end">
                        <Image
                            className="absolute h-full w-full object-cover"
                            fill
                            src={`https://image.tmdb.org/t/p/original/${collectionDetails.backdrop_path}`}
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
                                src={`https://image.tmdb.org/t/p/w500/${collectionDetails.poster_path}`}
                                priority
                                alt="hero"
                            />
                        </div>
                    </div>

                    <div className=" flex-1 px-10 text-white">
                        <div className="mt-8 flex flex-col">
                            <h1 className="text-4xl font-bold xl:text-5xl">
                                {collectionDetails.name}
                            </h1>
                        </div>

                        <div className="mt-3 flex flex-row gap-x-5">
                            <div className="h-10 w-10 rounded-full bg-gray-500"></div>
                            <div className="h-10 w-10 rounded-full bg-gray-500"></div>
                        </div>

                        <div className="mt-9 max-w-[600px]">
                            <p className="font-medium">
                                {collectionDetails.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mb-20">
                <div className="flex flex-row gap-x-10">
                    <div className="flex flex-1 flex-col gap-y-10">
                        <div className="flex flex-col">
                            <h1 className=" text-3xl font-semibold text-white">
                                In Collection
                            </h1>
                            <div className="mt-5 h-full">
                                <div className="grid grid-cols-3 gap-5">
                                    {collectionDetails.parts.map(
                                        (movie: Part) => (
                                            <MovieCardBlurEffect
                                                key={movie.id}
                                                resource={movie}
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
                                    {filteredTrendingMovie.map(
                                        (movie: Movie) => (
                                            <div className="" key={movie.id}>
                                                <SmallMovieCard movie={movie} />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
