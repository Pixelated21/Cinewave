'use client'

import MovieCard from "@/components/cards/MovieCard";
import MovieGridLayout from "@/components/layouts/MovieGridLayout";
import { Movie } from "@/typescript/interfaces";
import { useState } from "react";
import Link from "next/link";


interface MovieSectionProps {
    movies: {
        results: Movie[],
    };
    title: string;
}

export default function MovieSection({ movies, title }: MovieSectionProps) {
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies.results)

    return (
        <section className="bg-[#18181B]">
            <div className="mx-auto max-w-7xl py-[30px] px-4 sm:px-8 xl:px-2">
                <div className="flex flex-col gap-y-5">
                    <ul className="flex flex-row items-center gap-x-10 overflow-hidden">

                        <div className="group">
                            <h2
                                className="text-gray-500 cursor-pointer group-hover:text-gray-100 duration-300 font-semibold text-2xl">
                                {title}
                            </h2>
                            <span
                                className="h-0.5 w-0 group-hover:w-full bg-blue-700 duration-300"></span>
                        </div>
                    </ul>

                    <MovieGridLayout>
                        {filteredMovies.map((movie: Movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </MovieGridLayout>

                </div>
            </div>
        </section>
    )

}