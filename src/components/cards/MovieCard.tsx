import { Movie } from "@/typescript/interfaces";
import Image from "next/image";

// #TODO Add more image optimizations for faster load times

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <div
            className={`min-h-[320px] sm:max-h-[550px] sm:max-w-[550px] md:min-h-[400px] h-full relative group flex flex-row rounded-md overflow-hidden`}>

            <div className="pb-1.5 px-1.5 bg-black w-[25px]">
                <div
                    className="flex flex-col items-center justify-end gap-y-2 h-full w-full">
                    <h1 style={{
                        writingMode: "vertical-rl",
                    }} className="rotate-180 text-white text-xs whitespace-nowrap">{movie.title}</h1>
                    <span className="font-medium text-xs text-purple-600">{Number(movie.vote_average).toPrecision(2)}</span>
                </div>
            </div>

            <div className="relative flex-1 cursor-pointer">
                <Image className="absolute object-cover h-full w-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title} fill />
                <div
                    className="bg-black bg-opacity-0 group-hover:bg-opacity-50 duration-300 h-full w-full absolute"></div>
            </div>
        </div>
    )
}