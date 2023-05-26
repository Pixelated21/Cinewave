import { Movie } from "@/typescript/interfaces";
import Image from "next/image";

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <div
            className="h-72 relative group flex flex-row w-56 rounded-md overflow-hidden">
            <div className="pb-1.5 px-1.5 bg-black w-[25px] ">
                <div
                    className="flex flex-col items-center justify-end gap-y-2 h-full w-full">
                    <h1 style={{
                        writingMode: "vertical-rl",
                    }} className="rotate-180 text-white text-xs whitespace-nowrap">{movie.title}</h1>
                    <span className="font-medium text-xs text-purple-600">{movie.vote_average}</span>
                </div>
            </div>

            <div className="relative flex-1 cursor-pointer">
                <Image className="absolute object-cover h-full w-full"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title} fill />

                <div
                    className="bg-black bg-opacity-0 group-hover:bg-opacity-50 duration-300 h-full w-full absolute"></div>
            </div>
        </div>
    )
}