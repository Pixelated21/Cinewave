import { getPopularSharedListAction } from "@/app/_actions/shared_list";
import NavigationBar from "@/components/NavigationBar";
import PopularSpaceHero from "@/components/sections/share-space/PopularSpaceHero";

export default async function SharedSpacePage() {
    const getPopularSharedLists = getPopularSharedListAction();

    const [popularSharedList] = await Promise.all([
        getPopularSharedLists
    ]);

    return (
        <main className="min-h-screen pb-10 bg-[#18181B]">
            <NavigationBar className="absolute z-10 w-full bg-[#0e0e0f] md:bg-transparent md:hover:backdrop-blur-md md:backdrop-blur-none md:duration-500 md:delay-1000 md:hover:delay-300" />
            <PopularSpaceHero popularSharedList={popularSharedList} />
            <section className="mt-10 container">
                <div className="bg-white/10 h-12 mb-9 rounded-md"></div>
            </section>
        </main>
    )
}