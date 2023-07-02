"use client";
import { getLanguage } from "@/lib/utils";
import { Trending } from "@/types";
import Image from "next/image";
import Breaker from "../utils/Breaker";
import { Button } from "../ui/button";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function HeroSection({ trending }: { trending: Trending[] }) {
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

    const currentMovie = useMemo(
        () => trending[currentMovieIndex],
        [trending, currentMovieIndex]
    );

    const showNextMovie = () => {
        setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % trending.length);
    };

    const showPreviousMovie = () => {
        setCurrentMovieIndex(
            (prevIndex) => (prevIndex - 1 + trending.length) % trending.length
        );
    };

    useEffect(() => {
        const intervalId = setInterval(showNextMovie, 5000);

        return () => {
            clearInterval(intervalId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="absolute h-full w-full">
            <div className="relative flex h-full items-end">
                <Image
                    className="absolute h-full w-full object-cover"
                    fill
                    src={`https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path}`}
                    priority
                    alt="hero"
                />
                <div className="absolute h-full w-full bg-black bg-opacity-50"></div>
                <div className="absolute h-80 w-full bg-gradient-to-b from-[#0E0410]/0 to-[#0E0410]/90"></div>

                <div className="absolute left-0 right-0 mx-auto mb-14 h-1/2 max-w-7xl">
                    <div className="flex h-full justify-between px-4 sm:px-8 xl:px-2">
                        <div className="flex flex-col justify-end">
                            <div className="flex flex-col gap-y-3">
                                <h1 className="max-w-[600px] text-5xl font-semibold text-white">
                                    {currentMovie.title}
                                </h1>
                                <div>
                                    <ul className="flex items-center gap-x-3">
                                        <li>
                                            <span className="text-xs capitalize text-white">
                                                {currentMovie.media_type}
                                            </span>
                                        </li>
                                        <li>
                                            <span className="text-xs text-white">
                                                23m
                                            </span>
                                        </li>
                                        <li>
                                            <span className="text-xs text-white">
                                                {currentMovie.release_date}
                                            </span>
                                        </li>
                                        <li>
                                            <span className="rounded-md bg-green-400 px-1 py-[3px] text-xs font-semibold text-black">
                                                HD
                                            </span>
                                        </li>
                                        <li>
                                            <span className="rounded-md bg-white px-1 py-[3px] text-xs font-semibold text-black">
                                                {getLanguage(
                                                    currentMovie?.original_language,
                                                    "english_name"
                                                )}
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="max-w-[495px]">
                                    <p className="h-20 overflow-hidden text-xs text-white ">
                                        {currentMovie.overview}
                                    </p>
                                </div>
                            </div>

                            <Breaker height="42px" />

                            <div className="flex items-center gap-x-3">
                                <Button asChild>
                                    <Link
                                        href={`/${currentMovie.media_type}/${currentMovie.id}`}
                                    >
                                        More Details
                                    </Link>
                                </Button>

                                <Button className="bg-purple-500 hover:bg-purple-700">
                                    Add To Watchlist
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end gap-y-1.5">
                            <div
                                onClick={showPreviousMovie}
                                className="background flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-white"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </div>
                            <div
                                onClick={showNextMovie}
                                className="background flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-white"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
