'use client'

import MovieCard from "@/components/cards/MovieCard";
import MovieGridLayout from "@/components/layouts/MovieGridLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn, isReleasedBeforeToday } from "@/lib/utils";
import { Genre, Movie, Rating } from "@/typescript/interfaces";
import axios from "axios";
import Image from "next/image";
import { FormEvent, useState } from "react";

interface TryMeRandomizerProps {
    data: {
        genres: Genre[],
        ratings: Rating[]
    }
}

interface SearchQuery {
    query: string | null,
    genre: string | number | null,
    rating: string | number | undefined
}

const fetchSimilarMovies = async (movie: Movie) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/similar/${movie.id}`)
    return res.data
}

const fetchSearchResults = async ({ query }: { query: string }) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`);
    return response.data;
};

export default function TryMeRandomizer({ data }: TryMeRandomizerProps) {
    const { genres, ratings } = data

    const [searchQuery, setSearchQuery] = useState<SearchQuery>({
        query: null,
        genre: '',
        rating: ''
    })

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
    const [similarMovies, setSimilarMovies] = useState<Movie[]>([])
    const [searchResults, setSearchResults] = useState<Movie[]>([])

    const handleMovieSearch = async (query: string) => {
        if (!query || query?.length < 3) return
        const searchResultsData = await fetchSearchResults({ query })
        setSearchResults(searchResultsData.data.results.filter((movie: Movie) => (movie.release_date !== null || isReleasedBeforeToday(movie.release_date)) && (movie.poster_path !== null)).splice(0, 4))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!selectedMovie) return
        const searchResults = await fetchSimilarMovies(selectedMovie)
        setSimilarMovies(searchResults.results)
    }

    return (
        <section className="overflow-hidden">
            <div className="mx-auto max-w-7xl pt-[63px] px-4 sm:px-8 xl:px-2 relative">
                <div className="xl:h-[286px] h-[300px] max-w-7xl mx-auto relative ">

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
                        <form onSubmit={handleSubmit} className="h-full w-full">
                            <div className="grid sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-5 items-center  ">

                                <Input onChange={(e) => handleMovieSearch(e.target.value)} className="w-full text-white" type="search" placeholder="Want something similar?" />

                                <Select onValueChange={(value) => setSearchQuery((prev) => { return { ...prev, genre: value } })} >
                                    <SelectTrigger className="w-full text-white">
                                        <SelectValue placeholder="Genre" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full">
                                        {genres.map((genre) => (
                                            <SelectItem className="cursor-pointer" key={genre.id} value={`${genre.id}`}>{genre.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select onValueChange={(value) => setSearchQuery((prev) => { return { ...prev, rating: value } })}>
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
                        </form>

                    </div>

                </div>
            </div>

            <section className="bg-[#18181B]">
                <div className="mx-auto max-w-7xl pb-[30px] px-4 sm:px-8 xl:px-2">
                    <MovieGridLayout>
                        {searchResults.map((movie: Movie) => (
                            <div onClick={() => setSelectedMovie(movie)} key={movie.id} className={`${cn(selectedMovie?.id === movie.id ? 'border-red-500' : 'border-white', 'border-2')} min-h-[320px] sm:max-h-[550px] sm:max-w-[550px] md:min-h-[400px] h-full relative group flex flex-col overflow-hidden`}>
                                <div className="h-full w-full flex flex-row overflow-hidden rounded-md">

                                    <div className="pb-1.5 px-1.5 bg-black w-[25px] hidden sm:block">
                                        <div
                                            className="flex flex-col items-center justify-end gap-y-2 h-full w-full">
                                            <h1 style={{
                                                writingMode: "vertical-rl",
                                            }} className="rotate-180 text-white text-xs whitespace-nowrap">{movie.title}</h1>
                                            <span className="font-medium text-xs text-purple-600">{Number(movie.vote_average).toPrecision(2)}</span>
                                        </div>
                                    </div>

                                    <div className="relative flex-1 cursor-pointer">
                                        <Image className="absolute object-cover h-full w-full"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                            alt={movie.title ?? movie.original_title} fill />
                                        <div className="bg-black bg-opacity-0 group-hover:bg-opacity-50 duration-300 h-full w-full absolute"></div>
                                    </div>

                                </div>

                                <div className=" pt-2 flex flex-col gap-y-1 sm:hidden">
                                    <div>
                                        <p className="text-sm text-white font-semibold whitespace-nowrap">{movie.original_title}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-white whitespace-nowrap text-ellipsis overflow-hidden">{movie.release_date}</p>
                                    </div>
                                </div>
                            </div>))}
                    </MovieGridLayout>
                </div>
            </section>

            <section className="bg-[#18181B]">
                <div className="mx-auto max-w-7xl pb-[30px] px-4 sm:px-8 xl:px-2">
                    <MovieGridLayout>
                        {similarMovies.map((movie: Movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </MovieGridLayout>
                </div>
            </section>
        </section>
    )
}