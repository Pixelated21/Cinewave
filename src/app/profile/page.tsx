import NavigationBar from "@/components/NavigationBar";
import MovieCard from "@/components/cards/MovieCard";
import MovieGridLayout from "@/components/layouts/LayoutSection";
import { Movie } from "@/types";
import Image from "next/image";
import { getTrendingMoviesAction } from "../_actions/movie";


export default async function Profile() {
    const getTrendingMovies = getTrendingMoviesAction();

    const [trendingMovies] = await Promise.all([getTrendingMovies]);

    return (
        <main className="h-screen overflow-y-scroll bg-[#18181B]">
            <NavigationBar className="primary" />

            <section className="">
                <div className="mx-auto h-72 max-w-7xl px-4 py-14 sm:px-8 xl:px-2">
                    <div className="flex justify-between">
                        <div className="flex flex-row items-center gap-x-10">
                            <div className="group relative h-40 w-40 rounded-full">
                                {/* TODO: Replace animation with motion spring */}
                                <Image
                                    alt=""
                                    src={"/temp/rimuru.jpg"}
                                    fill
                                    className="absolute h-40 w-40 cursor-pointer rounded-full border-2 border-[#FFC107] bg-white duration-300 group-hover:border-8"
                                />
                            </div>

                            <div>
                                <div>
                                    <h1 className="mt-5 text-4xl font-bold text-white">
                                        Rimuru Tempest
                                    </h1>
                                </div>

                                <h2 className="mt-2 text-2xl font-bold text-white">
                                    <span className="text-[#FFC107]">Gold</span>{" "}
                                    Member
                                </h2>

                                <div className="mt-5 flex flex-col gap-y-2">
                                    <div className="flex flex-row items-center gap-x-4">
                                        <h1 className="w-28 text-xs font-bold text-white">
                                            Watched:
                                        </h1>
                                        <ProgressBar percentage={20} />
                                    </div>
                                    <div className="flex flex-row items-center gap-x-4 ">
                                        <h1 className="w-28 text-xs font-bold text-white">
                                            Favorites:
                                        </h1>
                                        <ProgressBar percentage={50} />
                                    </div>
                                    <div className="flex flex-row items-center gap-x-4">
                                        <h1 className="w-28 text-xs font-bold text-white">
                                            Shared Links:
                                        </h1>
                                        <ProgressBar percentage={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="">
                <div className="mx-auto max-w-7xl px-4 sm:px-8 xl:px-2">
                    <div className="grid grid-cols-2 gap-x-5">
                        <button className="flex items-center justify-center  rounded-sm border-2 border-gray-500 bg-gray-600 py-2 font-semibold text-gray-200 ">
                            <span className="text-sm">Watched</span>
                        </button>
                        <button className="flex items-center justify-center  rounded-sm border-2 border-gray-500 bg-gray-900 py-2 font-semibold text-gray-200">
                            <span className="text-sm">Favorites</span>
                        </button>
                    </div>
                </div>
            </section>

            <section className="">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 xl:px-2">
                    <div className="flex flex-col gap-y-5">
                        <div className="flex h-10 w-full flex-row justify-between">
                            <input className="h-10 w-96 rounded-sm border-2 bg-transparent px-2 text-white" />

                            <div className="flex items-center gap-x-3">
                                <button className="grid h-10 w-10 place-items-center rounded-sm bg-white"></button>
                            </div>
                        </div>

                        <MovieGridLayout>
                            {trendingMovies.results.map((movie: Movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </MovieGridLayout>
                    </div>
                </div>
            </section>
        </main>
    );
}

const ProgressBar = ({ percentage = 0 }: { percentage: number }) => {
    return (
        <div className="group flex cursor-pointer">
            <div className="relative h-3 w-40 overflow-hidden rounded-md border-[2px] border-gray-600 bg-gray-800 px-[2px]">
                <span
                    style={{
                        width: `${percentage - 2.5}%`,
                    }}
                    className="primary absolute bottom-1/2 top-1/2 my-auto h-[4px] rounded-md"
                ></span>
            </div>
            <div className="flex opacity-0 duration-300 group-hover:opacity-100">
                <span className="ml-2 text-xs font-bold text-gray-400">
                    (1/50)
                </span>
                <span className="ml-2 text-xs font-bold text-gray-200">
                    {percentage}%
                </span>
            </div>
        </div>
    );
};
