'use client'
import { Button, buttonVariants } from "@/components/ui/button";
import { SelectResource } from "@/lib/db/schema/resource";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Autoplay, Navigation, History, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type PopularSpaceHeroProps = {
    popularSharedList: any
}

const PopularSpaceHero = ({ popularSharedList }: PopularSpaceHeroProps) => {
    const [currentPopularSharedList, setCurrentPopularSharedList] = useState(0);
    const [currentDisplayedResourceIndex, setCurrentDisplayedResourceIndex] = useState(0);

    const filteredPopularSharedList = popularSharedList.filter(sharedList => sharedList.shared_resources.length > 0);
    const sharePopularListResources: SelectResource[] = filteredPopularSharedList[currentPopularSharedList].shared_resources.map((item: SelectResource[]) => item.resource);

    return (
        <section className="relative h-[571px] shadow-md xl:h-[671px] ">
            <div className="absolute h-full w-full blur-3xl">
                <div className="relative flex h-full items-end blur-xl md:blur-none duration-300">
                    <Image
                        className="absolute h-full w-full object-cover duration-1000 "
                        height={671}
                        width={1280}
                        src={`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL}/original/${sharePopularListResources[currentDisplayedResourceIndex]?.backdrop_path}`}
                        priority
                        alt={`Backdrop of: ${filteredPopularSharedList[currentPopularSharedList]?.title} | CineWave`}
                    />
                    <div className="absolute h-full w-full bg-black bg-opacity-50"></div>
                    <div className="absolute h-80 w-full bg-gradient-to-b -bottom-2 from-[#18181B]/0 to-[#18181B]"></div>
                </div>
            </div>

            <div className="absolute h-[calc(100%-55px)] md:h-[calc(100%-72px)] mt-[calc(55px+30px)] md:mt-[calc(72px+30px)] w-full container">
                <div className="bg-white/10 h-12 mb-9 rounded-md"></div>

                <div className="max-h-[380px] h-full relative overflow-hidden w-full flex gap-x-2">
                    <div className="prev-shared-list-button bg-white/10 hover:bg-white/70 duration-300 cursor-pointer rounded-sm h-full w-8 flex justify-center items-center">
                        <ChevronLeftIcon className="h-5 w-5 text-black" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <Swiper modules={[EffectCreative, Autoplay, Navigation, History]}
                            loop={true}
                            navigation={{
                                nextEl: ".next-shared-list-button",
                                prevEl: ".prev-shared-list-button",
                            }}
                            onSlideChange={(slide) => {
                                setCurrentPopularSharedList(slide.realIndex)
                                setCurrentDisplayedResourceIndex(0)
                            }}
                            effect="creative"
                            className="relative h-full w-full rounded-md"
                            slidesPerView={1}
                            autoplay={{
                                delay: 50000,
                                pauseOnMouseEnter: true,
                                disableOnInteraction: false,
                            }}
                            creativeEffect={{
                                prev: {
                                    shadow: true,
                                    translate: [0, 0, -100],
                                },
                                next: {
                                    translate: ["100%", 0, 0],
                                },
                            }}>
                            {filteredPopularSharedList.map((sharedList: any) => (
                                <SwiperSlide key={sharedList.id} >
                                    <Swiper
                                        className="h-full w-full relative"
                                        direction={'vertical'}
                                        autoplay={{
                                            delay: 5000,
                                            pauseOnMouseEnter: true,
                                            disableOnInteraction: false,
                                        }}
                                        onSlideChange={(slide) => {
                                            setCurrentDisplayedResourceIndex(slide.realIndex)
                                        }}
                                        navigation={{
                                            nextEl: ".next-resource-button",
                                            prevEl: ".prev-resource-button",
                                        }}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        modules={[Pagination]}
                                    >
                                        {sharedList.shared_resources.map((shared_resource: any) => (
                                            <SwiperSlide key={shared_resource.id} >
                                                <div className="relative group flex-1 w-full h-full overflow-hidden rounded-md">
                                                    <div className="absolute h-full w-full z-10 p-10">
                                                        <div className="flex relative h-full w-full flex-col justify-between">
                                                            <div className="flex items-center gap-x-4">
                                                                <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2">
                                                                    <Image
                                                                        className="absolute h-full w-full object-cover"
                                                                        height={80}
                                                                        width={80}
                                                                        src={`${sharedList.user.image}`}
                                                                        priority
                                                                        alt={`Backdrop of: ${sharedList?.title} | CineWave`}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <h2 className="text-white text-4xl font-semibold">{sharedList?.title}</h2>
                                                                    <p className="text-white text-sm font-semibold"><span>By {sharedList?.user.name}</span></p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <Link href={`/share-space/${sharedList?.link}`} className={buttonVariants()}>View List</Link>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Image
                                                        className="absolute h-full w-full object-cover object-right group-hover:scale-105 duration-200 "
                                                        height={671}
                                                        width={1280}
                                                        src={`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL}/original/${shared_resource?.resource?.backdrop_path}`}
                                                        priority
                                                        alt={`Backdrop of: ${shared_resource?.resource?.title} | CineWave`}
                                                    />
                                                    <div className="h-full w-full absolute bg-black opacity-40">
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}

                                    </Swiper>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="next-shared-list-button bg-white/10 hover:bg-white/70 duration-300 cursor-pointer rounded-sm h-full w-8 flex justify-center items-center">
                        <ChevronRightIcon className="h-5 w-5 text-black" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PopularSpaceHero;