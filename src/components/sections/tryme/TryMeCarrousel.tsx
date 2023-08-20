"use client";

import { Movie } from "@/types";
import Image from "next/image";

interface TryMeCarrouselProps {
    data: {
        movies: Movie[];
    };
}

export default function TryMeCarrousel({ data }: TryMeCarrouselProps) {
    const { movies } = data;

    return (
        <section>
            <div className="relative h-[758px]">
                <div className="relative mx-auto flex h-full max-w-7xl flex-row ">
                    <div className="group relative z-10 h-[557px] w-[304px]">
                        <Image
                            className="absolute h-full object-cover"
                            alt=""
                            src={`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL}/original/${movies[0].poster_path}`}
                            width={835}
                            height={713}
                        />

                        <div className="absolute h-full w-full bg-black opacity-40"></div>

                        <div className="absolute bottom-7 left-7 opacity-70 duration-300 group-hover:opacity-90">
                            <div className="flex flex-col items-start gap-y-4 text-white">
                                <div className="text-xs">HD</div>
                                <div className="text-xs">23m</div>
                                <div className="text-xs">
                                    {movies[4].release_date}
                                </div>
                                <div className="rounded-sm bg-green-600 px-[4px] py-[3px] text-xs text-black">
                                    HD
                                </div>
                                <div className="rounded-sm bg-black px-[4px] py-[3px] text-xs text-white">
                                    SUB
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 h-[713px] w-[835px]">
                        <Image
                            className="absolute h-full object-cover"
                            alt=""
                            src={`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL}/original/${movies[1].backdrop_path}`}
                            width={835}
                            height={713}
                        />

                        <div className="absolute h-full w-full bg-black opacity-10"></div>
                        <div className=" absolute bottom-0 h-full w-full bg-gradient-to-t from-black to-transparent"></div>

                        <div className="absolute bottom-16 left-7 ">
                            <div className="flex flex-col gap-y-4">
                                <h1 className="text-4xl font-bold text-white">
                                    {movies[1].title}
                                </h1>
                                <p className="w-[500px] text-sm font-normal text-gray-200">
                                    {movies[1].overview}
                                </p>
                            </div>
                        </div>

                        <div className="absolute bottom-7 right-7">
                            <div className="flex flex-col items-end gap-y-4 text-white">
                                <div className="text-xs">HD</div>
                                <div className="text-xs">23m</div>
                                <div className="text-xs">
                                    {movies[4].release_date}
                                </div>
                                <div className="rounded-sm bg-green-600 px-[4px] py-[3px] text-xs text-black">
                                    HD
                                </div>
                                <div className="rounded-sm bg-black px-[4px] py-[3px] text-xs text-white">
                                    SUB
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="group relative z-10 h-[557px] w-[304px]">
                        <Image
                            className="absolute h-full object-cover"
                            alt=""
                            src={`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL}/original/${movies[2].poster_path}`}
                            width={835}
                            height={713}
                        />

                        <div className="absolute h-full w-full bg-black opacity-40"></div>

                        <div className="absolute bottom-7 right-7 opacity-70 duration-300 group-hover:opacity-90">
                            <div className="flex flex-col items-end gap-y-4 text-white">
                                <div className="text-xs">HD</div>
                                <div className="text-xs">23m</div>
                                <div className="text-xs">
                                    {movies[4].release_date}
                                </div>
                                <div className="rounded-sm bg-green-600 px-[4px] py-[3px] text-xs text-black">
                                    HD
                                </div>
                                <div className="rounded-sm bg-black px-[4px] py-[3px] text-xs text-white">
                                    SUB
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 z-0 h-56 w-full">
                        <div className="relative h-full w-full">
                            <Image
                                className="absolute bottom-0 w-full"
                                alt=""
                                src={`/assets/banner-sm.png`}
                                fill
                            />

                            <div className="absolute h-full w-full bg-black opacity-90"></div>
                        </div>
                    </div>

                    <div className=" absolute bg-red-500">
                        <div className="relative mx-auto max-w-7xl bg-red-400"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
