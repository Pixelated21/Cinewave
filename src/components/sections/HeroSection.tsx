'use client'
import { getLanguage } from "@/lib/utils";
import { Trending } from "@/typescript/interfaces";
import Image from "next/image";
import Breaker from "../utils/Breaker";
import { Button } from "../ui/button";
import { useEffect, useMemo, useState } from "react";

export default function HeroSection({ trending }: { trending: Trending[] }) {

    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

    const currentMovie = useMemo(() => trending[currentMovieIndex], [
        trending,
        currentMovieIndex,
    ]);

    const showNextMovie = () => {
        setCurrentMovieIndex((prevIndex) =>
            (prevIndex + 1) % trending.length
        );
    };

    const showPreviousMovie = () => {
        setCurrentMovieIndex((prevIndex) =>
            (prevIndex - 1 + trending.length) % trending.length
        );
    };

    useEffect(() => {
        const intervalId = setInterval(showNextMovie, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

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
                                                {getLanguage(currentMovie?.original_language, 'english_name')}
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
                            <div onClick={showPreviousMovie} className="h-10 w-10 background rounded-md flex items-center justify-center text-white cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                </svg>

                            </div>
                            <div onClick={showNextMovie} className="h-10 w-10 background rounded-md flex items-center justify-center text-white cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                                </svg>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}