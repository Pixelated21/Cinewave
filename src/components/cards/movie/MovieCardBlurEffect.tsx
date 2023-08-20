"use client";

import { toggleFavoriteMovieAction } from "@/app/_actions/movie";
import { Movie, ResourceTypesEnum } from "@/types";
import Image from "next/image";
import Link from "next/link";

type MovieCardBlurEffectProps = {
    resource: Movie;
};

export default function MovieCardBlurEffect(props: MovieCardBlurEffectProps) {
    const { resource } = props;
    const genres = resource?.genre_ids?.map((genre) => genre).join(", ");

    return (
        <Link
            href={`/${ResourceTypesEnum.MOVIE}/${resource.id}`}
            className="relative h-[450px] overflow-hidden rounded-sm bg-black"
        >
            <div className="relative flex h-full w-full flex-col justify-end">
                {/* <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavoriteMovieAction({ id: resource.id });
                        console.log("Clicked on the button");
                    }}
                    className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white"
                >
                    <div className="h-6 w-6 rounded-full bg-gray-500 duration-300 hover:h-8 hover:w-8"></div>
                </button> */}

                <Image
                    alt={`Poster for: ${resource.title} | CineWave`}
                    className="absolute object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    src={`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL}/w500/${resource.poster_path}`}
                />

                <div className="relative h-[150px] w-full bg-gradient-to-t  from-black to-black/0 px-3 py-4 text-white backdrop-blur-lg">
                    <div className="flex h-full flex-col justify-evenly gap-y-2">
                        <div className="flex flex-row gap-x-2 text-sm font-light">
                            <span className="capitalize">USA</span>
                            <span className="text-yellow-500">
                                {resource.release_date}
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
