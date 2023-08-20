import { getYear } from "@/lib/utils";
import { Series } from "@/types";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SeriesCard({ resource }: { resource: Series }) {
    return (
        <div className="relative h-[270px] md:h-[365px] overflow-hidden rounded-sm"
        >
            <Link
                href={`/series/${resource.id}`}
                className=""
            >
                <div className="relative group h-[200px] md:h-[305px] flex w-full flex-col justify-end">

                    <Image
                        alt={`Poster for: ${resource.name} | CineWave`}
                        className="absolute group-hover:blur-[4px] duration-200 object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        src={`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL}/w500/${resource.poster_path}`}
                    />
                    <div className="absolute flex items-center justify-center md:h-14 md:w-14 h-10 w-10 group-hover:opacity-70 opacity-0 duration-200 bg-white rounded-full right-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Bookmark className="h-7 w-7 text-black" />
                    </div>
                </div>

            </Link>
            <div className="h-10 w-full mt-3">
                <Link href={`/movie/${resource.id}`} className="truncate text-sm font-semibold text-white" >{resource.name}</Link>
                <div className="text-white text-xs flex flex-row gap-x-2 mt-1.5 items-center">
                    <span>{getYear(resource.first_air_date)}</span>
                    <div className="h-1 w-1 bg-white rounded-full"></div>
                    <span>Movie</span>
                </div>
            </div>
        </div >
    )
}