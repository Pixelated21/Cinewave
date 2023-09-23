import { Trending } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function SharedListCard({ movie }: { movie: Trending }) {
    return (
        // TODO Change to w-[420px]
        <Link
            href={`/${movie.id}`}
            className="group relative h-64 w-full flex-1 overflow-hidden rounded-md bg-gray-800"
        >
            <Image
                className="absolute h-full w-full object-cover"
                src={`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL}/w500/${movie.backdrop_path}`}
                alt="eminence"
                fill
            />

            <div className="absolute h-full w-full bg-black bg-opacity-70 duration-300 group-hover:bg-opacity-40"></div>

            <div className="absolute h-full w-full p-4">
                <div className="flex h-full flex-col justify-end gap-y-1">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-semibold text-white">
                            {movie.title}
                        </h1>
                        <span className="h-0.5 w-1/6 bg-white duration-500 group-hover:w-3/6"></span>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <ul className="movies-center flex gap-x-1">
                                <li>
                                    <h4 className="text-sm font-medium text-white">
                                        {movie.release_date}
                                    </h4>
                                </li>
                                <li>
                                    <svg
                                        width="4"
                                        height="5"
                                        viewBox="0 0 4 5"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1.31554 1.25581C1.45428 0.494475 2.54572 0.494475 2.68446 1.25581C2.73638 1.54068 2.95932 1.76362 3.24419 1.81554C4.00553 1.95428 4.00553 3.04572 3.24419 3.18446C2.95932 3.23638 2.73638 3.45932 2.68446 3.74419C2.54572 4.50553 1.45428 4.50553 1.31554 3.74419C1.26362 3.45932 1.04068 3.23638 0.755808 3.18446C-0.00552511 3.04572 -0.00552535 1.95428 0.755808 1.81554C1.04068 1.76362 1.26362 1.54068 1.31554 1.25581Z"
                                            fill="#D9D9D9"
                                        />
                                    </svg>
                                </li>
                                <li>
                                    <h4 className="text-sm font-medium text-white">
                                        112m
                                    </h4>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium capitalize text-white">
                                {movie.media_type}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
