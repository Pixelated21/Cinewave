import { getLanguage } from "@/lib/utils";
import { Series } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function SmallSeriesCard({ resource }: { resource: Series }) {
    return (
        <div className="h-[70px]">
            <div className="flex h-full w-full flex-row items-center justify-between ">
                <div className="flex flex-row items-center gap-x-3 ">
                    <div className="relative h-[70px] w-[45px] overflow-hidden rounded-sm">
                        <Image
                            alt={`Poster for: ${resource?.name} | CineWave`}
                            className="absolute object-cover"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            src={`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL}/w300/${resource?.poster_path}`}
                        />
                    </div>
                    <div>
                        <Link
                            className="text-white duration-300 hover:text-purple-400"
                            href={`/series/${resource?.id}`}
                        >
                            <h1 className="w-[140px] truncate text-base font-semibold ">
                                {resource?.name}
                            </h1>
                        </Link>

                        <div className="flex flex-row gap-x-2">
                            <p className="text-sm font-semibold text-gray-400">
                                {resource?.vote_average.toPrecision(2)}
                            </p>
                            <p className="text-sm font-semibold text-gray-400">
                                {getLanguage(
                                    resource?.original_language,
                                    "english_name"
                                )}
                            </p>
                            <p className="text-sm font-semibold text-gray-400">
                                200m
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <Link className="" href={`/series/${resource?.id}`}>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-950">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6 text-white/50 duration-300 hover:text-white/90"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                                />
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
