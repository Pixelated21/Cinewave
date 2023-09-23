"use client";

import {
    getSimilarMovieAction,
    searchMoviesAction,
} from "@/app/_actions/movie";
import MovieCard from "@/components/cards/movie/MovieCard";
import MovieGridLayout from "@/components/layouts/LayoutSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { isReleasedBeforeToday } from "@/lib/utils";
import { Genre, Movie, Rating } from "@/types";
import Image from "next/image";
import { FormEvent, useState } from "react";

interface TryMeRandomizerProps {
    data: {
        genres: Genre[];
        ratings: Rating[];
    };
}

interface SearchQuery {
    query: string | null;
    genre: string | number | null;
    rating: string | number | undefined;
}

export default function TryMeRandomizer({ data }: TryMeRandomizerProps) {
    const { genres, ratings } = data;

    const [searchQuery, setSearchQuery] = useState<SearchQuery>({
        query: null,
        genre: "",
        rating: "",
    });

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
    const [searchResults, setSearchResults] = useState<Movie[]>([]);

    const handleMovieSearch = async (query: string) => {
        if (!query || query?.length < 3) return;
        const searchResultsData = await searchMoviesAction({ term: query });
        setSearchResults(
            // FIXME: Fix type hinting
            // @ts-ignore
            searchResultsData.data.results
                .filter(
                    (movie: Movie) =>
                        (movie.release_date !== null ||
                            isReleasedBeforeToday(movie.release_date)) &&
                        movie.poster_path !== null
                )
                .splice(0, 4)
        );
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedMovie) return;
        const searchResults = await getSimilarMovieAction(selectedMovie.id);
        setSimilarMovies(searchResults.results);
    };

    return (
        <section className="overflow-hidden">
            <div className="relative mx-auto max-w-7xl px-4 pt-[63px] sm:px-8 xl:px-2">
                <div className="relative mx-auto h-[300px] max-w-7xl xl:h-[286px] ">
                    <div className="absolute hidden lg:-right-60 lg:-top-32 lg:block xl:-right-48 xl:-top-32 2xl:-right-60 2xl:-top-32 ">
                        <div className="relative h-[460px] w-[530px]">
                            <Image
                                src="/assets/six-sided-dice.svg"
                                fill
                                priority
                                className="absolute h-full object-contain"
                                alt=""
                            />
                        </div>
                    </div>

                    <div>
                        <h1 className="text-xl font-semibold text-white opacity-20 sm:text-[32px] ">
                            Don’t know what to watch?
                        </h1>
                        <h1 className="text-4xl font-semibold leading-[123.5%] tracking-tighter text-white sm:text-[64px] ">
                            We Got You Covered
                        </h1>
                    </div>

                    <div className="absolute mt-6 w-full sm:w-3/4">
                        <form onSubmit={handleSubmit} className="h-full w-full">
                            <div className="grid items-center  gap-3 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4  ">
                                <Input
                                    onChange={(e) =>
                                        handleMovieSearch(e.target.value)
                                    }
                                    className="w-full text-white"
                                    type="search"
                                    placeholder="Want something similar?"
                                />

                                <Select
                                    onValueChange={(value) =>
                                        setSearchQuery((prev) => {
                                            return { ...prev, genre: value };
                                        })
                                    }
                                >
                                    <SelectTrigger className="w-full text-white">
                                        <SelectValue placeholder="Genre" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full">
                                        {genres?.map((genre) => (
                                            <SelectItem
                                                className="cursor-pointer"
                                                key={genre.id}
                                                value={`${genre.id}`}
                                            >
                                                {genre.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select
                                    onValueChange={(value) =>
                                        setSearchQuery((prev) => {
                                            return { ...prev, rating: value };
                                        })
                                    }
                                >
                                    <SelectTrigger className=" text-white">
                                        <SelectValue placeholder="Rating" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ratings?.map((rating) => (
                                            <SelectItem
                                                className="cursor-pointer"
                                                key={rating.value}
                                                value={`${rating.value}`}
                                            >
                                                {rating.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Button className="col-span-1 w-full bg-purple-500 sm:col-span-3 md:col-span-1 md:w-[140px] ">
                                    <span className="text-sm font-semibold text-white">
                                        Randomize
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <section className="bg-[#18181B]">
                <div className="mx-auto max-w-7xl px-4 pb-[30px] sm:px-8 xl:px-2">
                    <MovieGridLayout>
                        {searchResults.map((movie: Movie) => (
                            <div
                                key={movie.id}
                                onClick={() => setSelectedMovie(movie)}
                                className={`group relative flex h-full min-h-[320px] flex-col overflow-hidden sm:max-h-[550px] sm:max-w-[550px] md:min-h-[400px]`}
                            >
                                <div className="flex h-full w-full flex-row overflow-hidden rounded-md">
                                    <div className="hidden w-[25px] bg-black px-1.5 pb-1.5 sm:block">
                                        <div className="flex h-full w-full flex-col items-center justify-end gap-y-2">
                                            <h1
                                                style={{
                                                    writingMode: "vertical-rl",
                                                }}
                                                className="rotate-180 whitespace-nowrap text-xs text-white"
                                            >
                                                {movie.title}
                                            </h1>
                                            <span className="text-xs font-medium text-purple-600">
                                                {Number(
                                                    movie.vote_average
                                                ).toPrecision(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative flex-1 cursor-pointer">
                                        <Image
                                            className="absolute h-full w-full object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            src={`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL}/w500/${movie.poster_path}`}
                                            alt={movie.title}
                                            fill
                                        />
                                        <div className="absolute h-full w-full bg-black bg-opacity-0 duration-300 group-hover:bg-opacity-50"></div>
                                    </div>
                                </div>

                                <div className=" flex flex-col gap-y-1 pt-2 sm:hidden">
                                    <div>
                                        <p className="whitespace-nowrap text-sm font-semibold text-white">
                                            {movie.original_title}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-white">
                                            {movie.release_date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </MovieGridLayout>
                </div>
            </section>

            <section className="bg-[#18181B]">
                <div className="mx-auto max-w-7xl px-4 pb-[30px] sm:px-8 xl:px-2">
                    <MovieGridLayout>
                        {similarMovies.map((movie: Movie) => (
                            <MovieCard key={movie.id} resource={movie} />
                        ))}
                    </MovieGridLayout>
                </div>
            </section>
        </section>
    );
}
