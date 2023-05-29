'use client'
import { Movie } from "@/typescript/interfaces";
import Image from "next/image";

interface TryMeCarrouselProps {
    data: {
        movies: Movie[]
    }
}

export default function TryMeCarrousel({ data }: TryMeCarrouselProps) {
    const { movies } = data

    console.log(movies)

    return (
        <section>
            <div className="h-[758px] relative">

                <div className="flex flex-row mx-auto h-full max-w-7xl relative ">
                    <div className="h-[557px] relative w-[304px] group z-10">
                        <Image className="absolute object-cover h-full" alt=""
                            src={`https://image.tmdb.org/t/p/original/${movies[0].poster_path}`} width={835} height={713} />

                        <div className="bg-black w-full h-full absolute opacity-40"></div>

                        <div className="absolute bottom-7 left-7 opacity-70 duration-300 group-hover:opacity-90">
                            <div className="flex flex-col items-start gap-y-4 text-white">
                                <div className="text-xs">HD</div>
                                <div className="text-xs">23m</div>
                                <div className="text-xs">{movies[4].release_date}</div>
                                <div className="text-xs text-black bg-green-600 py-[3px] px-[4px] rounded-sm">HD</div>
                                <div className="text-xs text-white bg-black py-[3px] px-[4px] rounded-sm">SUB</div>
                            </div>
                        </div>
                    </div>

                    <div className="h-[713px] w-[835px] relative z-10">
                        <Image className="absolute object-cover h-full" alt=""
                            src={`https://image.tmdb.org/t/p/original/${movies[1].poster_path}`} width={835} height={713} />

                        <div className="bg-black w-full h-full absolute opacity-10"></div>
                        <div className=" w-full h-full absolute bottom-0 bg-gradient-to-t from-black to-transparent"></div>

                        <div className="absolute bottom-16 left-7 ">
                            <div className="flex flex-col gap-y-4">
                                <h1 className="text-white text-4xl font-bold">{movies[1].title}</h1>
                                <p className="text-gray-200 text-sm font-normal w-[500px]">{movies[1].overview}</p>
                            </div>
                        </div>

                        <div className="absolute bottom-7 right-7">
                            <div className="flex flex-col items-end gap-y-4 text-white">
                                <div className="text-xs">HD</div>
                                <div className="text-xs">23m</div>
                                <div className="text-xs">{movies[4].release_date}</div>
                                <div className="text-xs text-black bg-green-600 py-[3px] px-[4px] rounded-sm">HD</div>
                                <div className="text-xs text-white bg-black py-[3px] px-[4px] rounded-sm">SUB</div>
                            </div>
                        </div>
                    </div>

                    <div className="h-[557px] relative w-[304px] group z-10">
                        <Image className="absolute object-cover h-full" alt=""
                            src={`https://image.tmdb.org/t/p/original/${movies[2].poster_path}`} width={835} height={713} />

                        <div className="bg-black w-full h-full absolute opacity-40"></div>

                        <div className="absolute bottom-7 right-7 opacity-70 duration-300 group-hover:opacity-90">
                            <div className="flex flex-col items-end gap-y-4 text-white">
                                <div className="text-xs">HD</div>
                                <div className="text-xs">23m</div>
                                <div className="text-xs">{movies[4].release_date}</div>
                                <div className="text-xs text-black bg-green-600 py-[3px] px-[4px] rounded-sm">HD</div>
                                <div className="text-xs text-white bg-black py-[3px] px-[4px] rounded-sm">SUB</div>
                            </div>
                        </div>
                    </div>

                    <div className="h-56 w-full absolute z-0 bottom-0">
                        <div className="relative h-full w-full">
                            <Image className="absolute bottom-0 w-full" alt=""
                                src={`/assets/banner-sm.png`} fill />

                            <div className="bg-black w-full h-full absolute opacity-90"></div>
                        </div>
                    </div>

                    <div className=" bg-red-500 absolute">
                        <div className="mx-auto max-w-7xl relative bg-red-400">

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}