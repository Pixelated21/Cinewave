'use client'

import MovieCard from "@/components/cards/MovieCard";
import MovieGridLayout from "@/components/layouts/MovieGridLayout";
import { Genre, Movie } from "@/typescript/interfaces";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";


interface GenreSectionProps {
    movies: {
        page: number,
        results: Movie[],
        total_pages: number,
        total_results: number
    };
    genres: Genre[];
}

export default function GenreSection({ movies, genres }: GenreSectionProps) {

    const searchParameters = useSearchParams()
    const router = useRouter()

    const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null)
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies.results)

    function handleGenreChange(genre: Genre) {
        setSelectedGenre(genre)
        router.push('home/?with_genres=' + genre.id,)


    }

    return (
        <section className="bg-[#18181B]">
            <div className="mx-auto max-w-7xl py-[30px] px-4 sm:px-8 xl:px-2">
                <div className="flex flex-col gap-y-5">
                    <ul className="flex flex-row items-center gap-x-10 overflow-hidden">
                        { }
                        {genres.map((genre) => (
                            <li key={genre.id} className="group cursor-pointer">
                                <Link href={`/home/?with_genres=${genre.id}`} scroll={false}>
                                    <div className="flex flex-col">
                                        <h2
                                            className="text-gray-500 group-hover:text-gray-100 duration-300 font-medium text-xl">
                                            {genre.name}
                                        </h2>
                                        <span
                                            className="h-0.5 w-0 group-hover:w-full bg-blue-700 duration-300"></span>
                                    </div>
                                </Link>
                            </li>
                        ))}
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