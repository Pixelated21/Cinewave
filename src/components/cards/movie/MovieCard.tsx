import { getYear } from "@/lib/utils";
import { Movie } from "@/types";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ resource }: { resource: Movie }) {
    return (
        <div className="relative h-[310px] md:h-[410px] overflow-hidden rounded-sm"
        >
            <Link
                href={`/movie/${resource.id}`}
                className=""
            >
                <div className="relative group h-[240px] overflow-hidden md:h-[335px] flex w-full flex-col justify-end">

                    <Image
                        alt={`Poster for: ${resource.title} | CineWave`}
                        className="absolute group-hover:blur-[4px] duration-200 object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        src={`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL}/w500/${resource.poster_path}`}
                    />
                    {/* Actions */}
                    <div className="absolute flex justify-center items-center right-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="flex flex-col items-center gap-y-2">
                            {/* <div className="flex items-center justify-center md:h-14 md:w-14 h-10 w-10 group-hover:opacity-70 opacity-0 duration-200 bg-white rounded-full">
                                <Heart className="h-7 w-7 text-black" />
                            </div> */}
                            <div className="flex items-center justify-center md:h-14 md:w-14 h-10 w-10 group-hover:opacity-70 opacity-0 duration-200 bg-white rounded-full">
                                <MoreHorizontal className="h-7 w-7 text-black" />
                            </div>
                            {/* <div className="flex items-center justify-center md:h-14 md:w-14 h-10 w-10 group-hover:opacity-70 opacity-0 duration-200 bg-white rounded-full">
                                <Bookmark className="h-7 w-7 text-black" />
                            </div> */}
                        </div>
                    </div>

                </div>

            </Link>
            <div className="h-10 w-full mt-3">
                <Link href={`/movie/${resource.id}`}>
                    <div className="truncate text-sm font-semibold text-white">
                        {resource.title}
                    </div>
                </Link>
                <div className="text-white text-xs flex flex-row gap-x-2 mt-1.5 items-center">
                    <span>{getYear(resource.release_date)}</span>
                    <div className="h-1 w-1 bg-white rounded-full"></div>
                    <span>Movie</span>
                </div>
            </div>
        </div >
    )
}