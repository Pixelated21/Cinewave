import { Movie } from "@/types";
import { ResourceTypes } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function MovieCardBlurEffect({
    resource,
    type,
}: {
    resource: Movie;
    type: ResourceTypes;
}) {
    return (
        <Link
            href={`/${type}/${resource.id}`}
            className="relative h-[450px] overflow-hidden rounded-sm bg-black"
        >
            <div className="relative flex h-full w-full flex-col justify-end">
                <Image
                    alt={`Poster for: ${resource.title}`}
                    className="absolute object-cover"
                    fill
                    src={`https://image.tmdb.org/t/p/w500/${resource.poster_path}`}
                />
                <div className="relative h-[150px] w-full bg-gradient-to-t from-black to-black/0 px-3 py-4 text-white backdrop-blur-lg">
                    <div className="flex h-full flex-col justify-evenly gap-y-2">
                        <span className="text-sm font-light">
                            USA,{" "}
                            <span className="text-yellow-500">
                                {resource.release_date}
                            </span>
                        </span>
                        <h1 className="truncate text-lg font-semibold">
                            {/* FIXME: Implement Proper Type hinting */}
                            {/* @ts-ignore */}
                            {resource.name || resource.title}
                        </h1>
                        <span className="text-sm font-light text-gray-300">
                            {resource.vote_average.toPrecision(2)}/10
                        </span>
                        <p className="truncate text-xs font-semibold text-gray-600">
                            {resource?.genre_ids
                                ?.map((genre) => genre)
                                .join(", ")}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
