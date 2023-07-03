import { ResourceTypesEnum, Series } from "@/types";
import Image from "next/image";
import Link from "next/link";

type MovieCardBlurEffectProps = {
    resource: Series;
};

export default function SeriesCardBlurEffect(props: MovieCardBlurEffectProps) {
    const { resource } = props;
    const genres = resource?.genre_ids?.map((genre) => genre).join(", ");

    return (
        <Link
            href={`/${ResourceTypesEnum.SERIES}/${resource.id}`}
            className="relative h-[450px] overflow-hidden rounded-sm bg-black"
        >
            <div className="relative flex h-full w-full flex-col justify-end">
                <Image
                    alt={`Poster for: ${resource.name} | CineWave`}
                    className="absolute object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    src={`https://image.tmdb.org/t/p/w500/${resource.poster_path}`}
                />
                <div className="relative h-[150px] w-full bg-gradient-to-t from-black to-black/0 px-3 py-4 text-white backdrop-blur-lg">
                    <div className="flex h-full flex-col justify-evenly gap-y-2">
                        <div className="flex flex-row gap-x-2 text-sm font-light">
                            <span className="capitalize">USA</span>
                            <span className="text-yellow-500">
                                {resource.first_air_date}
                            </span>
                        </div>
                        <h1 className="truncate text-lg font-semibold">
                            {/* FIXME: Implement Proper Type hinting */}
                            {/* @ts-ignore */}
                            {resource.name || resource.title}
                        </h1>
                        <span className="text-sm font-light text-gray-300">
                            {resource.vote_average.toPrecision(2)}/10
                        </span>
                        <p className="truncate text-xs font-semibold text-gray-600">
                            {genres}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
