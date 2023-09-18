import NavigationBar from "@/components/NavigationBar";
import MovieGridLayout from "@/components/layouts/LayoutSection";
import Image from "next/image";
import { getTrendingMoviesAction, getUserWatchListAction } from "../_actions/movie";
import WatchListCard from "@/components/cards/WatchListCard";
import { getAuthSession } from "@/lib/auth";
import { getCurrentUserAction, getCurrentUserWatchListAction } from "../_actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const TRAIL_BOOKMARKS = 50;
const TRAIL_FAVORITES = 50;
const TRAIL_SHARED_LINKS = 10;

export const dynamic = 'force-dynamic'

export default async function Profile() {
    const session = await getAuthSession();
    const getTrendingMovies = getTrendingMoviesAction();
    const getBookmarkedMovies = getCurrentUserWatchListAction();

    const [trendingMovies, bookmarkedMovies] = await Promise.all([getTrendingMovies, getBookmarkedMovies]);

    const bookmarkedMoviesProgress = (bookmarkedMovies && Math.floor((bookmarkedMovies?.length / TRAIL_BOOKMARKS) * 100)) ?? 0;


    return (
        <main id="main-scrollbar" className="h-screen overflow-y-scroll bg-[#18181B]">
            <NavigationBar className="bg-[#0e0e0f]" />

            <section className="">
                <div className="mx-auto h-72 max-w-7xl px-4 py-14 sm:px-8 xl:px-2">
                    <div className="flex justify-between">
                        <div className="flex flex-row items-center gap-x-10">
                            <Avatar className="h-40 w-40 border-2 border-[#FFC107] bg-white duration-300 hover:border-8">
                                <AvatarImage src={session?.user?.image!} />
                                <AvatarFallback className="text-6xl">{getInitials(session?.user?.name!)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div>
                                    <h1 className="mt-5 text-4xl font-bold text-white">
                                        {session?.user?.name}
                                    </h1>
                                </div>

                                <h2 className="mt-2 text-2xl font-bold text-white">
                                    <span className="text-[#FFC107]">Gold</span>{" "}
                                    Member
                                </h2>

                                <div className="mt-5 hidden lg:flex flex-col gap-y-2">
                                    <div className="flex flex-row items-center gap-x-4">
                                        <h1 className="w-28 text-xs font-bold text-white">
                                            Watched:
                                        </h1>
                                        <ProgressBar percentage={bookmarkedMoviesProgress} current={bookmarkedMovies?.length ?? 0} max={TRAIL_BOOKMARKS} />
                                    </div>
                                    <div className="flex flex-row items-center gap-x-4 ">
                                        <h1 className="w-28 text-xs font-bold text-white">
                                            Favorites:
                                        </h1>
                                        <ProgressBar max={TRAIL_FAVORITES} />
                                    </div>
                                    <div className="flex flex-row items-center gap-x-4">
                                        <h1 className="w-28 text-xs font-bold text-white">
                                            Shared Links:
                                        </h1>
                                        <ProgressBar max={TRAIL_SHARED_LINKS} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 sm:px-8  pt-5 xl:px-2 justify-center flex items-center">
                <hr className="border-gray-700/50 w-full" />
            </div>


            <section className="">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 xl:px-2">
                    <div className="flex flex-col gap-y-5">

                        <MovieGridLayout>
                            {bookmarkedMovies?.map((resource: any) => (
                                <WatchListCard key={resource.id} resource={resource} />
                            ))}
                        </MovieGridLayout>

                    </div>
                </div>
            </section>
        </main>
    );
}

const ProgressBar = ({ percentage = 0, current = 0, max }: { percentage?: number, current?: number, max: number }) => {
    return (
        <div className="group flex cursor-pointer">
            <div className="relative h-3 w-40 overflow-hidden rounded-md border-[2px] border-gray-600 bg-gray-800 px-[2px]">
                <span
                    style={{
                        width: `${percentage}%`,
                    }}
                    className="primary absolute bottom-1/2 top-1/2 my-auto h-[4px] rounded-md"
                ></span>
            </div>
            <div className="flex opacity-0 duration-300 group-hover:opacity-100">
                <span className="ml-2 text-xs font-bold text-gray-400">
                    ({current}/{max})
                </span>
                <span className="ml-2 text-xs font-bold text-gray-200">
                    {percentage}%
                </span>
            </div>
        </div>
    );
};
