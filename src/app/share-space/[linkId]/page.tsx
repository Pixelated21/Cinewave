import { findSharedListAction } from "@/app/_actions/shared_list";
import NavigationBar from "@/components/NavigationBar";
import BookmarkCard from "@/components/cards/BookmarkCard";
import LayoutSection from "@/components/layouts/LayoutSection";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function SharedSpacePage({ params }: { params: { linkId: string } }) {
    const { linkId } = params;
    const getSharedList = findSharedListAction(linkId);

    const [sharedList] = await Promise.all([
        getSharedList
    ]);

    if (!sharedList) {
        return notFound();
    }

    const resources = sharedList.shared_resources.map(item => item.resource);
    const user = sharedList.user;

    console.log(resources)


    return (
        <main className="h-screen overflow-y-scroll bg-[#18181B]">
            <section className="relative h-[571px] shadow-md xl:h-[671px] ">
                <NavigationBar className="absolute z-10 w-full bg-[#0e0e0f] md:bg-transparent md:hover:backdrop-blur-md md:backdrop-blur-none md:duration-500 md:delay-1000 md:hover:delay-300" />

                <div className="absolute h-full w-full blur-lg">
                    <div className="relative flex h-full items-end blur-xl md:blur-none duration-300">
                        <Image
                            className="absolute h-full w-full object-cover "
                            height={671}
                            width={1280}
                            src={`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL}/original/${resources[0].backdrop_path}`}
                            priority
                            alt={`Backdrop of: ${resources[0].title} | CineWave`}
                        />
                        <div className="absolute h-full w-full bg-black bg-opacity-50"></div>
                        <div className="absolute h-80 w-full bg-gradient-to-b -bottom-2 from-[#18181B]/0 to-[#18181B]"></div>
                    </div>
                </div>

                <div className="absolute h-[calc(100%-55px)] md:h-[calc(100%-72px)] mt-[calc(55px+30px)] md:mt-[calc(72px+30px)] w-full container">
                    <div className="bg-white/10 h-12 mb-9 rounded-md"></div>

                    <div className="h-[400px] w-full flex gap-x-2">
                        <div className="bg-white/10 hover:bg-white/70 duration-300 cursor-pointer rounded-sm h-full w-8 flex justify-center items-center">
                            <ChevronLeftIcon className="h-5 w-5 text-black" />
                        </div>
                        <div className="relative group w-full h-full overflow-hidden rounded-md">
                            <div className="absolute h-full w-full z-10 p-10">
                                <div className="flex relative h-full w-full flex-col justify-between">
                                    <div className="flex items-center gap-x-4">
                                        <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2">
                                            <Image
                                                className="absolute h-full w-full object-cover"
                                                height={80}
                                                width={80}
                                                src={`${user.image}`}
                                                priority
                                                alt={`Backdrop of: ${resources[0].title} | CineWave`}
                                            />
                                        </div>
                                        <div>
                                            <h2 className="text-white text-4xl font-semibold">{sharedList.title}</h2>
                                            <p className="text-white text-sm font-semibold"><span>By {user.name}</span></p>
                                        </div>
                                    </div>
                                    <div>
                                        <Button>View List</Button>
                                    </div>
                                    <div className="absolute right-0 bottom-0 flex flex-col gap-y-2">
                                        <Button className="p-2 rounded-full h-10 w-10 bg-gray-600"><ChevronUpIcon className="h-5 w-5" /></Button>
                                        <Button className="p-2 rounded-full h-10 w-10 bg-gray-600"><ChevronDownIcon className="h-5 w-5" /></Button>
                                    </div>
                                </div>
                            </div>


                            <Image
                                className="absolute h-full w-full object-cover object-right group-hover:scale-105 duration-200 "
                                height={671}
                                width={1280}
                                src={`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL}/original/${resources[0].backdrop_path}`}
                                priority
                                alt={`Backdrop of: ${resources[0].title} | CineWave`}
                            />
                            <div className="h-full w-full absolute bg-black opacity-40">

                            </div>
                        </div>
                        <div className="bg-white/10 hover:bg-white/70 duration-300 cursor-pointer rounded-sm h-full w-8 flex justify-center items-center">
                            <ChevronRightIcon className="h-5 w-5 text-black" />
                        </div>
                    </div>
                </div>

            </section>

        </main>
    )
}