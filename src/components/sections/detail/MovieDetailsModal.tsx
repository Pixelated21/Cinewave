'use client'

import CastCard from "@/components/cards/CastCard";
import { Button } from "@/components/ui/button";
import { cn, getLanguage } from "@/lib/utils";
import { MovieCredits, MovieDetails, MovieVideo, MovieVideoRequest } from "@/typescript/interfaces";
import Image from "next/image";
import { useState } from "react";

export default function MovieDetailsModal({ details, credits, videos }: { details: MovieDetails, credits: MovieCredits, videos: MovieVideoRequest }) {

    const [selectedVideo, setSelectedVideo] = useState<MovieVideo | null>(videos.results[0] ?? null)

    console.log(details)

    return (
        <div id="movieModal" className="h-[500px] xl:h-[750px] w-full bg-[#18181B]/95 overflow-y-auto rounded-md px-14 py-[60px] xl:py-[92px] mx-auto">
            <div className="h-[427px] w-full overflow-hidden ">
                <div className="flex flex-row items-center gap-x-5  h-full w-full">
                    <div className="h-full flex-1 relative overflow-hidden">

                        {videos.results?.length !== 0 ? (<iframe
                            src={`https://www.youtube.com/embed/${selectedVideo?.key}?autoplay=1`}
                            title={selectedVideo?.name}
                            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-sm object-cover w-full h-full"
                        />
                        ) : (
                            <Image className="rounded-sm object-cover w-full h-full" src={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`} alt={details.title} fill />
                        )}

                    </div>
                    <div className="w-[1px] h-[313px] rounded-lg bg-gray-500" />
                    <div className="h-[427px] w-[160px] overflow-y-auto">
                        <div className="flex flex-col gap-y-5 h-full w-full">
                            {videos.results?.map((video) => (
                                <div onClick={() => setSelectedVideo(video)} className={cn(`h-[85px] group overflow-hidden w-[152px] cursor-pointer relative rounded-sm`, (selectedVideo?.key === video.key) ? 'border-4 border-gray-400' : '')} key={video.id}>
                                    <Image className="absolute object-cover" alt={video.name} src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLB2EoORWOGsz-YJAN_0sFx42DbuwA`} fill />

                                    <div className="absolute h-full w-full bg-black/50 " />

                                    <div className="absolute h-full w-full flex justify-center items-center">
                                        <span className="text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 text-white/50 duration-300 hover:text-white/90">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                                            </svg>
                                        </span>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ul className="flex flex-row gap-x-3 mt-2.5">
                {details.genres?.map((genre) => (
                    <Button className="bg-gray-600 cursor-pointer" asChild key={genre.id}>
                        <li className="text-white" key={genre.id}>{genre.name}</li>
                    </Button>
                ))}
            </ul>

            <div className="mt-8 flex flex-col gap-y-[6px] text-white">
                <h1 className=" text-4xl font-semibold ">{details.original_title}</h1>

                <div className="flex flex-row items-center gap-x-3">
                    <span className=" text-xs">Movie</span>
                    <span className=" text-xs">{details.runtime}m</span>
                    <span className=" text-xs">{details.release_date}</span>
                    <span
                        className="text-xs rounded-md font-semibold text-black bg-green-400 py-[3px] px-1">
                        {getLanguage(details.original_language, 'english_name')}
                    </span>
                </div>
            </div>
            <div className="mt-8 flex flex-col gap-3">
                <h1 className="text-white text-xl font-semibold">Synopsis</h1>

                <p className="text-white text-sm max-w-[436px] overflow-hidden">{details.overview}</p>
            </div>

            <div className="mt-20 flex flex-col gap-y-4 ">
                <h1 className="text-white text-xl font-semibold">Cast</h1>
                <ul className="flex flex-row gap-x-5 overflow-x-auto">
                    {credits.cast?.splice(0, 5).map((cast) => (
                        <CastCard key={cast.id} cast={cast} />
                    ))}
                </ul>
            </div>
        </div>
    )
}