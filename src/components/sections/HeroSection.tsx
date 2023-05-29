'use client'
import { getLanguage } from "@/lib/utils";
import { Trending } from "@/typescript/interfaces";
import Image from "next/image";
import Breaker from "../utils/Breaker";
import { Button } from "../ui/button";

export default function HeroSection({ trending }: { trending: Trending[] }) {

    const trendingMovies = trending.slice(0, 5)

    let currentMovie = trendingMovies[0]

    currentMovie = {
        ...currentMovie,
        original_language: getLanguage(currentMovie?.original_language, 'english_name')
    };


    return (
        <section className="absolute h-full w-full">
            <div className="h-full relative flex items-end">
                <Image className="object-cover h-full w-full absolute" fill
                    src={`https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path}`}
                    priority
                    alt="hero" />
                <div className="bg-black bg-opacity-50 w-full h-full absolute"></div>
                <div
                    className="bg-gradient-to-b from-[#0E0410]/0 to-[#0E0410]/90 w-full h-80 absolute"></div>

                <div className="max-w-7xl mx-auto absolute mb-14 h-1/2 left-0 right-0">
                    <div className="flex justify-between h-full px-4 sm:px-8 xl:px-2">
                        <div className="flex flex-col justify-end">
                            <div className="gap-y-3 flex flex-col">
                                <h1 className="text-5xl font-semibold text-white max-w-[600px]">
                                    {currentMovie.title}
                                </h1>
                                <div>
                                    <ul className="flex items-center gap-x-3">
                                        <li><span className="text-xs text-white capitalize">{currentMovie.media_type}</span></li>
                                        <li><span className="text-xs text-white">23m</span></li>
                                        <li>
                                            <span className="text-xs text-white">{currentMovie.release_date}</span>
                                        </li>
                                        <li>
                                            <span
                                                className="text-xs rounded-md font-semibold text-black bg-green-400 py-[3px] px-1">
                                                HD
                                            </span>
                                        </li>
                                        <li>
                                            <span
                                                className="text-xs rounded-md font-semibold text-black bg-white py-[3px] px-1">
                                                {currentMovie.original_language}
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="max-w-[495px]">
                                    <p className="text-xs text-white">
                                        {currentMovie.overview}
                                    </p>
                                </div>
                            </div>

                            <Breaker height="42px" />

                            <div className="flex gap-x-3 items-center">
                                <Button>
                                    More Details
                                </Button>

                                <Button className="bg-purple-500 hover:bg-purple-700">
                                    Add To Watchlist
                                </Button>

                            </div>
                        </div>
                        <div className="flex flex-col gap-y-1.5 justify-end">
                            <div className="h-10 w-10 background rounded-md"></div>
                            <div className="h-10 w-10 background rounded-md"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}