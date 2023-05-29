import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Genre, Rating } from "@/typescript/interfaces";
import Image from "next/image";

interface TryMeRandomizerProps {
    data: {
        genres: Genre[],
        ratings: Rating[]
    }
}

export default function TryMeRandomizer({ data }: TryMeRandomizerProps) {
    const { genres, ratings } = data

    return (
        <section className="overflow-hidden">
            <div className="mx-auto max-w-7xl pt-[63px] px-4 sm:px-8 xl:px-2 relative">
                <div className="xl:h-[286px] h-[400px] max-w-7xl mx-auto relative ">

                    <div className="absolute 2xl:-right-60 2xl:-top-32 xl:-right-48 xl:-top-32 lg:-right-60 lg:-top-32 hidden lg:block ">
                        <div className="relative h-[460px] w-[530px]">
                            <Image src="/assets/six-sided-dice.svg" fill priority className="absolute object-contain h-full" alt="" />
                        </div>
                    </div>

                    <div>
                        <h1 className="text-xl sm:text-[32px] font-semibold text-white opacity-20 ">Don’t know what to watch?</h1>
                        <h1 className="text-4xl sm:text-[64px] leading-[123.5%] tracking-tighter font-semibold text-white ">We Got You Covered</h1>
                    </div>

                    <div className="mt-6 absolute w-full sm:w-3/4">
                        <div className="grid sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-5 items-center  ">

                            <Input className="w-full text-white" type="search" placeholder="Want something similar?" />

                            <Select>
                                <SelectTrigger className="w-full text-white">
                                    <SelectValue placeholder="Genre" />
                                </SelectTrigger>
                                <SelectContent className="w-full">
                                    {genres.map((genre) => (
                                        <SelectItem className="cursor-pointer" key={genre.id} value={`${genre.id}`}>{genre.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select>
                                <SelectTrigger className=" text-white">
                                    <SelectValue placeholder="Rating" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ratings.map((rating) => (
                                        <SelectItem className="cursor-pointer" key={rating.value} value={`${rating.value}`}>{rating.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button className="bg-purple-500 w-full col-span-1 sm:col-span-3 md:col-span-1 md:w-[140px] ">
                                <span className="text-sm font-semibold text-white">Randomize</span>
                            </Button>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}