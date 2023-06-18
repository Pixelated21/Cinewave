import Modal from "@/components/modal"
import MovieDetailsModal from "@/components/sections/detail/MovieDetailsModal"
import { MovieCredits, MovieDetails, MovieVideoRequest } from "@/typescript/interfaces"
import axios from "axios"

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

export default async function MovieDetailsIntercepted({ params }: { params: { id: string } }) {
    const { id } = params
    const detailsData: Promise<MovieDetails> = fetchMovieDetails({ id: id })
    const creditsData: Promise<MovieCredits> = fetchMovieCredits({ id: id })
    const videosData: Promise<MovieVideoRequest> = fetchMovieVideos({ id: id })

    const [details, credits, videos] = await Promise.all([detailsData, creditsData, videosData])

    const filteredVideos = {
        ...videos,
        results: videos.results.filter((video) => video.type?.toLowerCase() === "trailer" && video.official === true),
    }

    const filteredCredits = {
        ...credits,
        cast: credits.cast.filter((cast) => cast.profile_path !== null).splice(0, 5)
    }

    return (
        <Modal>
            <MovieDetailsModal credits={filteredCredits} videos={filteredVideos} details={details} />
        </Modal>
    )
}