import NavigationBar from "@/components/NavigationBar";
import AddSharedResource from "@/components/actions/add-shared-resource";
import { getAllSharedListAction } from "../_actions/shared_list";
import TrendingCard from "@/components/cards/TrendingCard";
import { getTrendingMoviesAction } from "../_actions/movie";
import SharedListCard from "@/components/cards/SharedList";
import HeroSection from "@/components/sections/home/HeroSection";
import Image from "next/image";
import TryMeRandomizer from "@/components/sections/tryme/TryMeRandomizer";
import TryMeCarrousel from "@/components/sections/tryme/TryMeCarrousel";



export default async function ShareSpacePage() {
    const allSharedLinks = await getAllSharedListAction()
    const getTrendingMovies = await getTrendingMoviesAction();
    console.log(getTrendingMovies)
    console.log(allSharedLinks)

    return (
        <main className="h-screen overflow-y-auto bg-[#18181B]">
            <NavigationBar className="bg-[#0e0e0f]" />
            <TryMeCarrousel movies={getTrendingMovies.results} />
        </main>
    );
}
