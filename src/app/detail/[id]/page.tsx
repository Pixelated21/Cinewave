import NavigationBar from "@/components/NavigationBar"
import CastCard from "@/components/cards/CastCard"
import Modal from "@/components/modal"
import MovieDetailsModal from "@/components/sections/detail/MovieDetailsModal"
import { Button } from "@/components/ui/button"
import Breaker from "@/components/utils/Breaker"
import { getLanguage } from "@/lib/utils"
import { MovieCredits, MovieDetails, MovieVideoRequest } from "@/typescript/interfaces"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"

const fetchMovieDetails = async ({ id }: { id: string | number }) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
            api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
        },
    })
    return res.data
}

const fetchMovieCredits = async ({ id }: { id: string | number }) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
        params: {
            api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
        },
    })
    return res.data
}

const fetchMovieVideos = async ({ id }: { id: string | number }) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
        params: {
            api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
        },
    })
    return res.data
}

export default async function MovieDetails({ params }: { params: { id: string } }) {
    const { id } = params
    const detailsData: Promise<MovieDetails> = fetchMovieDetails({ id: id })
    const creditsData: Promise<MovieCredits> = fetchMovieCredits({ id: id })
    const videosData: Promise<MovieVideoRequest> = fetchMovieVideos({ id: id })

    const [details, credits, videos] = await Promise.all([detailsData, creditsData, videosData])

    const filteredVideos = {
        ...videos,
        results: videos.results.filter((video) => video.type?.toLowerCase() === "trailer" && video.official === true),
    }

    return (
        <main className="bg-[#0E0410] h-screen overflow-y-auto">
            <section className="relative h-[571px] xl:h-[671px] shadow-md">
                <NavigationBar className="z-10 absolute w-full" />

                <div className="absolute h-full w-full">
                    <div className="h-full relative flex items-end">
                        <Image className="object-cover h-full w-full absolute" fill
                            src={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`}
                            priority
                            alt="hero" />
                        <div className="bg-black bg-opacity-50 w-full h-full absolute"></div>
                        <div className="bg-gradient-to-b from-[#0E0410]/0 to-[#0E0410] w-full h-80 absolute"></div>
                    </div>
                </div>
            </section>

            <section className="z-10 -mt-60 relative mb-20 px-10 container">
                <div className="flex flex-row h-full">

                    <div className="flex flex-col">
                        <div className="w-[250px] h-[400px] xl:w-[300px] xl:h-[450px] rounded-sm relative">
                            <Image className="object-cover absolute rounded-sm" fill src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} priority alt="hero" />
                        </div>
                        <div className="flex flex-row items-center gap-x-7 mt-7">
                            <div className="h-20 w-20 rounded-full flex items-center justify-center bg-[#200725]">
                                <span className="text-3xl font-bold text-white">{Number(details.vote_average).toPrecision(2)}</span>
                            </div>
                            <div className="flex flex-col gap-y-2.5">
                                <div className=" flex flex-row items-end gap-x-1"><span className="text-sm font-semibold text-white">{details.vote_count}</span><span className="text-xs text-gray-200">Ratings</span></div>
                                <div className=" flex flex-row items-end gap-x-1"><span className="text-sm font-semibold text-white">{84}</span><span className="text-xs text-gray-200">Reviews</span></div>
                            </div>
                        </div>
                    </div>

                    <div className=" flex-1 text-white px-10">
                        <div className="flex flex-col mt-8">
                            <h1 className="text-4xl xl:text-5xl font-bold">{details.title}</h1>
                            <div className="mt-2.5 text-xs"><span>Original Title: </span><span>{details.original_title}</span></div>
                            <div className="mt-2.5 flex flex-row gap-x-2 text-sm font-semibold">
                                <div>Series (2017 - 2021)</div>
                                <div>5 Seasons</div>
                                <div>48 Episodes</div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-row gap-x-5">
                            <div>Trailers</div>
                            <div>Action 1</div>
                            <div>Action 2</div>
                        </div>

                        <div className="mt-9 max-w-[608px]">
                            <p className="font-medium">{details.overview}</p>
                        </div>

                        <div className="mt-9">
                            <h1 className="font-bold text-xl">Details</h1>

                            <div className="mt-8 flex flex-col">
                                <div className="flex items-center gap-x-5 py-2">
                                    <span className="text-base w-40">Genres</span>
                                    <span>{details.genres.map((genre) => genre.name).join(", ")}</span>
                                </div>
                                <div className="flex items-center gap-x-5 py-2">
                                    <span className="text-base w-40">Country of Origin</span>
                                    <span>Spain</span>
                                </div>
                                <div className="flex items-center gap-x-5 py-2">
                                    <span className="text-base w-40">Runtime</span>
                                    <span>{details.runtime}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden xl:block w-[300px] mt-8">
                        <h1 className="text-white text-lg font-bold">Cast & Crew</h1>
                        <div className="flex flex-col gap-y-5 mt-8">
                            {credits.cast?.splice(0, 4).map((cast) => (
                                <div key={cast.id} className="flex items-center gap-x-4">
                                    <div className="h-14 w-14 rounded-full relative">
                                        <Image className="object-cover rounded-full absolute" fill src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`} priority alt="hero" />
                                    </div>
                                    <div className="flex flex-col text-white">
                                        <span className="text-sm font-bold">{cast.name}</span>
                                        <span className="text-xs font-normal">{cast.character}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-5 flex flex-row items-center gap-x-2">
                            <span className="text-white font-semibold text-sm">Show more</span>
                            <div className="h-5 w-5 rounded-full bg-white"></div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}