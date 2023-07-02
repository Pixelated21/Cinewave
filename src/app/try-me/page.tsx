import NavigationBar from "@/components/NavigationBar";
import TryMeRandomizer from "@/components/sections/tryme/TryMeRandomizer";
import { genres } from "@/data/genres";
import { ratings } from "@/data/ratings";
import { getTrendingMoviesAction } from "../_actions/movie";

export default async function TryMe() {
    const getTrendingMovies = getTrendingMoviesAction();

    const [trendingMovies] = await Promise.all([getTrendingMovies]);

    const tryMeCarrouselData = {
        movies: trendingMovies.results,
    };

    const tryMeRandomizerData = {
        genres,
        ratings,
    };

    return (
        <main className="h-screen overflow-y-auto bg-[#18181B]">
            <NavigationBar className="primary" />
            <TryMeRandomizer data={tryMeRandomizerData} />
        </main>
    );
}
