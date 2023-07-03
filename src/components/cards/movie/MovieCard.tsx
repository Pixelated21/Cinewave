import { Movie } from "@/types";
import Link from "next/link";
import Image from "next/image";

// #TODO Add more image optimizations for faster load times

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <Link
            href={`/movie/${movie.id}`}
            className={`group relative flex h-full min-h-[320px] flex-col overflow-hidden sm:max-h-[550px] sm:max-w-[550px] md:min-h-[400px]`}
        >
            <div className="flex h-full w-full flex-row overflow-hidden rounded-md">
                <div className="hidden w-[25px] bg-black px-1.5 pb-1.5 sm:block">
                    <div className="flex h-full w-full flex-col items-center justify-end gap-y-2">
                        <h1
                            style={{
                                writingMode: "vertical-rl",
                            }}
                            className="rotate-180 whitespace-nowrap text-xs text-white"
                        >
                            {movie.title}
                        </h1>
                        <span className="text-xs font-medium text-purple-600">
                            {Number(movie.vote_average).toPrecision(2)}
                        </span>
                    </div>
                </div>

                <div className="relative flex-1 cursor-pointer">
                    <Image
                        className="absolute h-full w-full object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={`Poster for: ${movie.title} | CineWave`}
                        fill
                    />
                    <div className="absolute h-full w-full bg-black bg-opacity-0 duration-300 group-hover:bg-opacity-50"></div>
                </div>
            </div>

            <div className=" flex flex-col gap-y-1 pt-2 sm:hidden">
                <div>
                    <p className="whitespace-nowrap text-sm font-semibold text-white">
                        {movie.original_title}
                    </p>
                </div>
                <div>
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-white">
                        {movie.release_date}
                    </p>
                </div>
            </div>
        </Link>
    );
}
