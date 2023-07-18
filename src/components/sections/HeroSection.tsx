"use client";
import { getLanguage } from "@/lib/utils";
import { Trending } from "@/types";
import Image from "next/image";
import Breaker from "../utils/Breaker";
import { Button } from "../ui/button";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Autoplay, Navigation, History } from "swiper/modules";
import "swiper/css";

export default function HeroSection({ trending }: { trending: Trending[] }) {
    return (
        <Swiper
            modules={[EffectCreative, Autoplay, Navigation, History]}
            loop={true}
            effect="creative"
            className="relative h-full w-full"
            slidesPerView={1}
            autoplay={{
                delay: 5000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
            }}
            creativeEffect={{
                prev: {
                    shadow: true,
                    translate: [0, 0, -100],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            }}
        >
            <Image
                alt="banner"
                className="absolute object-cover brightness-[0.1]"
                fill
                src={"/assets/banner.png"}
            />
            {trending.map((movie) => (
                <SwiperSlide className="relative" key={movie?.id}>
                    <section className="absolute h-full w-full">
                        <div className="relative flex h-full items-end">
                            <Image
                                className="absolute h-full w-full object-cover"
                                fill
                                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                                priority
                                alt="hero"
                            />
                            <div className="absolute h-full w-full bg-black bg-opacity-50" />
                            <div className="absolute h-80 w-full bg-gradient-to-b from-[#0E0410]/0 to-[#0E0410]/90" />

                            <div className="absolute left-0 right-0 mx-auto mb-14 h-1/2 max-w-7xl">
                                <div className="flex h-full justify-between px-4 sm:px-8 xl:px-2">
                                    <div className="flex flex-col justify-end">
                                        <div className="flex flex-col gap-y-3">
                                            <h1 className="max-w-[600px] text-5xl font-semibold text-white">
                                                {movie?.title}
                                            </h1>
                                            <div className="flex items-center gap-x-3">
                                                <span className="text-xs capitalize text-white">
                                                    {movie?.media_type}
                                                </span>

                                                <span className="text-xs text-white">
                                                    {movie?.release_date}
                                                </span>

                                                <span className="rounded-md bg-green-400 px-1 py-[3px] text-xs font-semibold text-black">
                                                    HD
                                                </span>

                                                <span className="rounded-md bg-white px-1 py-[3px] text-xs font-semibold text-black">
                                                    {getLanguage(
                                                        movie?.original_language,
                                                        "english_name"
                                                    )}
                                                </span>
                                            </div>

                                            <div className="max-w-[495px]">
                                                <p className="h-16 overflow-hidden text-xs text-white ">
                                                    {movie?.overview}
                                                </p>
                                            </div>
                                        </div>

                                        <Breaker height="32px" />

                                        <div className="flex items-center gap-x-3">
                                            <Button asChild>
                                                <Link
                                                    href={`/${movie.media_type}/${movie.id}`}
                                                >
                                                    More Details
                                                </Link>
                                            </Button>

                                            <Button disabled className="bg-purple-800 hover:bg-purple-700">
                                                Add To Watchlist
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
