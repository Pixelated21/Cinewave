"use client";
import { getLanguage, getYear } from "@/lib/utils";
import { Trending } from "@/types";
import Image from "next/image";
import { Button } from "../../ui/button";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Autoplay, Navigation, History } from "swiper/modules";
import "swiper/css";
import AddToWatchListButton from "@/components/actions/resource-add-to-watchlist-button";

export default function HeroSection({ trending }: { trending: Trending[] }) {
    return (
        <Swiper
            modules={[EffectCreative, Autoplay, Navigation, History]}
            loop={true}
            // effect="creative"
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
            {trending.map((movie, movieIndex) => (
                <SwiperSlide className="relative" key={movie?.id}>
                    <section className="absolute h-full w-full">
                        <div className="relative flex h-full items-end">
                            <div className="h-full w-full absolute flex overflow-hidden">

                                <div className="w-[380px] xl:w-[542px] hidden lg:block bg-[#18181B]"></div>

                                <div className=" flex-1 relative overflow-hidden">
                                    <Image
                                        className="absolute h-full w-full object-cover brightness-[0.9]"
                                        fill
                                        src={`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL}/original/${movie?.backdrop_path}`}
                                        priority
                                        alt={`${movie?.title} | Cinewave`}
                                    />

                                    {/* Left Frame Borders */}
                                    <div className="absolute  -left-4 h-full w-[240px] blur-sm bg-gradient-to-r from-[#18181B]  to-transparent" />
                                    <div className="absolute  -left-4 h-full w-[240px] blur-sm bg-gradient-to-r from-[#18181B]  to-transparent" />

                                    {/* Right Frame Borders */}
                                    <div className="absolute  -right-2 h-full w-60 blur-sm bg-gradient-to-l from-[#18181B] to-transparent" />
                                    <div className="absolute  -right-2 h-full w-60 blur-sm bg-gradient-to-l from-[#18181B] to-transparent" />


                                    {/* Top Frame Borders */}
                                    {/* <div className="absolute  top-0 h-3 w-full bg-gradient-to-b from-[#18181B] via-[#18181B] to-transparent" /> */}
                                    <div className="absolute  top-0 h-1/3 w-full bg-gradient-to-b from-[#18181B] to-transparent" />

                                    {/* Bottom Frame Borders */}
                                    <div className="absolute  mx-auto -left-5 blur-sm -bottom-2 h-3 w-[104%] bg-gradient-to-t from-[#18181B] via-[#18181B] to-transparent" />
                                    <div className="absolute  mx-auto -left-5 -bottom-2 h-2/3 w-[104%] bg-gradient-to-t from-[#18181B] to-transparent" />
                                </div>
                            </div>

                            <div className="absolute left-0 right-0 mx-auto mb-5 md:mb-14 h-1/2 max-w-7xl">
                                <div className="flex h-full justify-between px-4 sm:px-8 xl:px-2">
                                    <div className="flex flex-col gap-y-2 md:gap-y-8 justify-end">
                                        <div className="flex flex-col gap-y-1 md:gap-y-3 max-w-lg">
                                            <h1 className="text-xs 2xl:text-sm font-semibold md:font-black text-white">
                                                <p className="text-[#3f3f46]"># {movieIndex + 1} Spotlight</p>
                                            </h1>

                                            <h1 className=" mb-2 line-clamp-2 text-base md:text-3xl 2xl:text-5xl font-black text-white">
                                                {movie?.title}
                                            </h1>
                                            <div className="md:flex hidden text-xs 2xl:text-sm items-center gap-x-3">
                                                <span className=" capitalize  text-white">
                                                    {movie?.media_type}
                                                </span>

                                                <span className=" text-white">
                                                    {movie?.release_date}
                                                </span>

                                                <span className="rounded-md bg-green-400 px-1 py-[3px]  font-semibold text-black">
                                                    HD
                                                </span>

                                                <span className="rounded-md bg-white px-1 py-[3px]  font-semibold text-black">
                                                    {getLanguage(
                                                        movie?.original_language,
                                                        "english_name"
                                                    )}
                                                </span>
                                            </div>

                                            <p className="hidden md:[display:-webkit-box] line-clamp-2 lg:line-clamp-3 text-xs 2xl:text-sm text-white ">
                                                {movie?.overview}
                                            </p>
                                        </div>

                                        <div className="flex gap-2 items-center">

                                            <div className="">
                                                <AddToWatchListButton resource_id={movie.id.toString()} poster_path={movie.poster_path} release_date={getYear(movie.release_date)} title={movie.title} resource_type='movie' />
                                            </div>

                                            <Button size={'sm'} className="bg-gray-800 hover:bg-gray-700" asChild>
                                                <Link
                                                    href={`/movie/${movie.id}`}
                                                >
                                                    More Details
                                                </Link>
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
