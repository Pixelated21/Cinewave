import MovieCard from "@/components/cards/MovieCard";
import RecommendedCard from "@/components/cards/TrendingCard";
import Image from "next/image";
import axios from "axios";
import { Movie, Trending } from "@/typescript/interfaces";
import TrendingCard from "@/components/cards/TrendingCard";
import HeroSection from "@/components/sections/HeroSection";
import { NavigationLink, links } from "@/components/NavigationBar";
import type { NavLink } from "@/components/NavigationBar";

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
    console.log(trending)

    return (
        <main className=" h-screen overflow-y-auto">
            <div className="relative h-[571px]">
                <nav className="mt-5 z-10 absolute max-w-7xl left-0 right-0 mx-auto w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-x-16 items-center">
                            <div>
                                <Image className="object-contain" src={'/logo.svg'} alt="logo" width={189} height={40} />
                            </div>
                            <div className="h-10 w-44 bg-white"></div>
                        </div>
                        <div className="flex items-center gap-x-8">
                            <ul className="flex items-center gap-x-8">
                                {links.map((link: NavLink) => (
                                    <NavigationLink key={link.href} href={link.href} title={link.title} />
                                ))}
                            </ul >
                            <div className="h-10 w-28 primary rounded-sm grid place-items-center">
                                <span className="text-sm font-bold text-white">Logout</span>
                            </div>
                        </div>
                    </div>
                </nav>
                <HeroSection trending={trending.results} />
            </div>


            {/* Trending Section */}
            <section className="bg-[#18181B]">
                <div className="mx-auto max-w-7xl py-[60px]">
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

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2.5 gap-y-2.5">
                            {trending.results.splice(0, 3).map((item: Trending) => (
                                <TrendingCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Genres Section */}
            <section className="bg-[#18181B]">
                <div className="mx-auto max-w-7xl py-[30px]">
                    <div className="flex flex-col gap-y-5">
                        <ul className="flex flex-row items-center gap-x-10">
                            <SectionHeadingLink title="Action" />
                            <SectionHeadingLink title="Comedy" />
                            <SectionHeadingLink title="Horror" />
                            <SectionHeadingLink title="Romance" />
                        </ul>

                        <div className="grid grid-cols-5 gap-x-7 gap-y-7">
                            {movies.results.map((movie: Movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export function SectionHeadingLink({ title }: { title: string }) {
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