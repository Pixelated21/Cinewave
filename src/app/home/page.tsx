import MovieCard from "@/components/cards/MovieCard";
import Image from "next/image";
import axios from "axios";
import { Movie, Trending } from "@/typescript/interfaces";
import TrendingCard from "@/components/cards/TrendingCard";
import HeroSection from "@/components/sections/HeroSection";
import { NavigationLink, links } from "@/components/NavigationBar";
import MovieGridLayout from "@/components/layouts/MovieGridLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fetchDiscoverMovies = async () => {
    const res = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
            api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
        }
    })
    return res.data
}

const fetchTrendingMovies = async () => {
    const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/day`, {
        params: {
            api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
        }
    })
    return res.data
}

export default async function HomePage() {

    const movies = await fetchDiscoverMovies()
    const trending = await fetchTrendingMovies()

    return (
        <main className=" h-screen overflow-y-auto">
            <div className="relative h-[671px]">
                <nav className="mt-4 z-10 absolute max-w-7xl left-0 right-0 mx-auto w-full">
                    <div className="flex justify-between items-center px-4 sm:px-8 xl:px-2">
                        <div className="flex gap-x-16 items-center">
                            <Link href="/">
                                <Image className="object-contain" src={'/logo.svg'} alt="logo" width={189} height={40} />
                            </Link>
                            <Input className="w-52 text-white" type="search" placeholder="Have something in mind?" />

                            <div className="h-10  bg-white rounded-sm lg:block hidden"></div>
                        </div>
                        <div className="flex items-center gap-x-8">
                            <ul className="md:flex items-center gap-x-8 hidden">
                                {links.map((link) => (
                                    <NavigationLink key={link.href + link.title} href={link.href} title={link.title} />
                                ))}
                            </ul >
                            <Button className=" hover:bg-red-500 text-white font-semibold">
                                Login
                            </Button>
                        </div>
                    </div>
                </nav>
                <HeroSection trending={trending.results} />
            </div>


            {/* Trending Section */}
            <section className="bg-[#18181B]">
                <div className="mx-auto max-w-7xl py-[60px] px-4 sm:px-8 xl:px-2">
                    <div className="flex flex-col gap-y-5">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-x-5">
                                <h1 className="text-[32px] font-semibold text-white">Trending</h1>
                                <div className="flex gap-x-3 items-center text-white">
                                    <div>Movie</div>
                                    <div>TV</div>
                                </div>

                            </div>
                            <div>
                                <h3 className="text-white text-sm">View all</h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2.5 gap-y-2.5">
                            {trending.results.splice(0, 3).map((item: Trending) => (
                                <TrendingCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Genres Section */}
            <section className="bg-[#18181B]">
                <div className="mx-auto max-w-7xl py-[30px] px-4 sm:px-8 xl:px-2">
                    <div className="flex flex-col gap-y-5">
                        <ul className="flex flex-row items-center gap-x-10">
                            <SectionHeadingLink title="Action" />
                            <SectionHeadingLink title="Comedy" />
                            <SectionHeadingLink title="Horror" />
                            <SectionHeadingLink title="Romance" />
                        </ul>

                        <MovieGridLayout>
                            {movies.results.map((movie: Movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </MovieGridLayout>

                    </div>
                </div>
            </section>
        </main>
    )
}

interface SectionHeadingLinkProps {
    title: string;
}

const SectionHeadingLink = ({ title }: SectionHeadingLinkProps) => {
    return (
        <li className="group cursor-pointer">
            <div className="flex flex-col">
                <h2
                    className="text-gray-500 group-hover:text-gray-950 duration-300 font-medium text-xl">
                    {title}
                </h2>
                <span
                    className="h-0.5 w-0 group-hover:w-full bg-blue-700 duration-300"></span>
            </div>
        </li>
    )
}