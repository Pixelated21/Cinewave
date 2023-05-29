import NavigationBar from "@/components/NavigationBar";
import MovieCard from "@/components/cards/MovieCard";
import MovieGridLayout from "@/components/layouts/MovieGridLayout";
import { Progress } from "@/components/ui/progress";
import { Movie } from "@/typescript/interfaces";
import axios from "axios";
import Image from "next/image";

const fetchDiscoverMovies = async () => {
    const res = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
            api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
        }
    })
    return res.data
}

export default async function Profile() {

    const movies = await fetchDiscoverMovies()

    return (
        <main className="bg-[#18181B] h-screen overflow-y-scroll">
            <NavigationBar className="primary" />

            <section className="">
                <div className="mx-auto max-w-7xl h-72 py-14 px-4 sm:px-8 xl:px-2">

                    <div className="flex justify-between">
                        <div className="flex flex-row gap-x-10 items-center">
                            <div className="w-40 h-40 group rounded-full relative">
                                {/* TODO: Replace animation with motion spring */}
                                <Image alt="" src={'/temp/rimuru.jpg'} fill className="bg-white cursor-pointer border-2 duration-300 group-hover:border-8 border-[#FFC107] h-40 absolute rounded-full w-40" />
                            </div>

                            <div>
                                <div>
                                    <h1 className="text-white text-4xl font-bold mt-5">Rimuru Tempest</h1>
                                </div>

                                <h2 className="text-white text-2xl font-bold mt-2">
                                    <span className="text-[#FFC107]">Gold</span> Member
                                </h2>

                                <div className="flex flex-col gap-y-2 mt-5">
                                    <div className="flex flex-row items-center gap-x-4">
                                        <h1 className="text-white text-xs font-bold w-28">Watched:</h1>
                                        <ProgressBar percentage={20} />
                                    </div>
                                    <div className="flex flex-row items-center gap-x-4 ">
                                        <h1 className="text-white text-xs font-bold w-28">Favorites:</h1>
                                        <ProgressBar percentage={50} />
                                    </div>
                                    <div className="flex flex-row items-center gap-x-4">
                                        <h1 className="text-white text-xs font-bold w-28">Shared Links:</h1>
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
                        <button className="border-gray-500 font-semibold bg-gray-600  text-gray-200 border-2 flex justify-center items-center py-2 rounded-sm ">
                            <span className="text-sm">Watched</span>
                        </button>
                        <button className="border-gray-500 font-semibold bg-gray-900  text-gray-200 border-2 flex justify-center items-center py-2 rounded-sm">
                            <span className="text-sm">Favorites</span>
                        </button>

                    </div>
                </div>
            </section>

            <section className="">
                <div className="mx-auto max-w-7xl py-16 px-4 sm:px-8 xl:px-2">
                    <div className="flex flex-col gap-y-5">

                        <div className="flex flex-row justify-between w-full h-10">
                            <input className="border-2 bg-transparent text-white px-2 h-10 w-96 rounded-sm" />

                            <div className="flex items-center gap-x-3">
                                <button className="bg-white h-10 w-10 grid place-items-center rounded-sm"></button>
                            </div>
                        </div>

                        <MovieGridLayout>
                            {movies.results.map((movie: Movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </MovieGridLayout>

                    </div>
                </div>
            </section>
        </main>
    )
}

const ProgressBar = ({ percentage = 0 }: { percentage: number }) => {
    return (
        <div className="flex group cursor-pointer">
            <div className="h-3 w-40 relative px-[2px] overflow-hidden border-gray-600 border-[2px] bg-gray-800 rounded-md">
                <span style={{
                    width: `${percentage - 2.5}%`,
                }} className="h-[4px] absolute primary top-1/2 bottom-1/2 my-auto rounded-md"></span>
            </div>
            <div className="flex group-hover:opacity-100 opacity-0 duration-300">
                <span className="text-gray-400 text-xs font-bold ml-2">(1/50)</span>
                <span className="text-gray-200 text-xs font-bold ml-2">{percentage}%</span>
            </div>
        </div>

    )
}