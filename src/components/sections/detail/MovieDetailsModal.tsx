"use client";

import CastCard from "@/components/cards/CastCard";
import { Button } from "@/components/ui/button";
import { cn, getLanguage } from "@/lib/utils";
import { Credits, MovieDetails, MovieVideo, MovieVideoRequest } from "@/types";
import Image from "next/image";
import { useState } from "react";

export default function MovieDetailsModal({
    details,
    credits,
    videos,
}: {
    details: MovieDetails;
    credits: Credits;
    videos: MovieVideoRequest;
}) {
    const [selectedVideo, setSelectedVideo] = useState<MovieVideo | null>(
        videos.results[0] ?? null
    );

    console.log(details);

    return (
        <div
            id="movieModal"
            className="mx-auto h-[500px] w-full overflow-y-auto rounded-md bg-[#18181B]/95 px-14 py-[60px] xl:h-[750px] xl:py-[92px]"
        >
            <div className="h-[427px] w-full overflow-hidden ">
                <div className="flex h-full w-full flex-row  items-center gap-x-5">
                    <div className="relative h-full flex-1 overflow-hidden">
                        {videos.results?.length !== 0 ? (
                            <iframe
                                src={`https://www.youtube.com/embed/${selectedVideo?.key}?autoplay=1`}
                                title={selectedVideo?.name}
                                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="h-full w-full rounded-sm object-cover"
                            />
                        ) : (
                            <Image
                                className="h-full w-full rounded-sm object-cover"
                                src={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`}
                                alt={details.title}
                                fill
                            />
                        )}
                    </div>
                    <div className="h-[313px] w-[1px] rounded-lg bg-gray-500" />
                    <div className="h-[427px] w-[160px] overflow-y-auto">
                        <div className="flex h-full w-full flex-col gap-y-5">
                            {videos.results?.map((video) => (
                                <div
                                    onClick={() => setSelectedVideo(video)}
                                    className={cn(
                                        `group relative h-[85px] w-[152px] cursor-pointer overflow-hidden rounded-sm`,
                                        selectedVideo?.key === video.key
                                            ? "border-4 border-gray-400"
                                            : ""
                                    )}
                                    key={video.id}
                                >
                                    <Image
                                        className="absolute object-cover"
                                        alt={video.name}
                                        src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLB2EoORWOGsz-YJAN_0sFx42DbuwA`}
                                        fill
                                    />

                                    <div className="absolute h-full w-full bg-black/50 " />

                                    <div className="absolute flex h-full w-full items-center justify-center">
                                        <span className="text-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-10 w-10 text-white/50 duration-300 hover:text-white/90"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ul className="mt-2.5 flex flex-row gap-x-3">
                {details.genres?.map((genre) => (
                    <Button
                        className="cursor-pointer bg-gray-600"
                        asChild
                        key={genre.id}
                    >
                        <li className="text-white" key={genre.id}>
                            {genre.name}
                        </li>
                    </Button>
                ))}
            </ul>

            <div className="mt-8 flex flex-col gap-y-[6px] text-white">
                <h1 className=" text-4xl font-semibold ">
                    {details.original_title}
                </h1>

                <div className="flex flex-row items-center gap-x-3">
                    <span className=" text-xs">Movie</span>
                    <span className=" text-xs">{details.runtime}m</span>
                    <span className=" text-xs">{details.release_date}</span>
                    <span className="rounded-md bg-green-400 px-1 py-[3px] text-xs font-semibold text-black">
                        {getLanguage(details.original_language, "english_name")}
                    </span>
                </div>
            </div>
            <div className="mt-8 flex flex-col gap-3">
                <h1 className="text-xl font-semibold text-white">Synopsis</h1>

                <p className="max-w-[436px] overflow-hidden text-sm text-white">
                    {details.overview}
                </p>
            </div>

            <div className="mt-20 flex flex-col gap-y-4 ">
                <h1 className="text-xl font-semibold text-white">Cast</h1>
                <ul className="flex flex-row gap-x-5 overflow-x-auto">
                    {credits.cast?.splice(0, 5).map((cast) => (
                        <CastCard key={cast.id} cast={cast} />
                    ))}
                </ul>
            </div>
        </div>
    );
}
