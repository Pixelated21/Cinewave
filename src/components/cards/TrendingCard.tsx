import { Trending } from "@/typescript/interfaces";
import Image from "next/image";

export default function TrendingCard({ item }: { item: Trending }) {
    return (
        <a
            href="#"
            className="h-64 rounded-md group relative w-[420px] overflow-hidden bg-gray-800">

            <Image className="absolute object-cover h-full w-full w-72 "
                src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                alt="eminence" fill />

            <div
                className="bg-black bg-opacity-70 group-hover:bg-opacity-40 duration-300 w-full h-full absolute"></div>

            <div className="absolute p-4 w-full h-full">
                <div className="flex flex-col h-full justify-end gap-y-1">
                    <div className="flex flex-col">
                        <h1 className="text-white text-2xl font-semibold">
                            {item.title}
                        </h1>
                        <span
                            className="h-0.5 w-1/6 group-hover:w-3/6 duration-500 bg-white"></span>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <ul className="flex items-center gap-x-1">
                                <li>
                                    <h4 className="text-white text-sm font-medium">{item.release_date}</h4>
                                </li>
                                <li>
                                    <svg
                                        width="4"
                                        height="5"
                                        viewBox="0 0 4 5"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.31554 1.25581C1.45428 0.494475 2.54572 0.494475 2.68446 1.25581C2.73638 1.54068 2.95932 1.76362 3.24419 1.81554C4.00553 1.95428 4.00553 3.04572 3.24419 3.18446C2.95932 3.23638 2.73638 3.45932 2.68446 3.74419C2.54572 4.50553 1.45428 4.50553 1.31554 3.74419C1.26362 3.45932 1.04068 3.23638 0.755808 3.18446C-0.00552511 3.04572 -0.00552535 1.95428 0.755808 1.81554C1.04068 1.76362 1.26362 1.54068 1.31554 1.25581Z"
                                            fill="#D9D9D9" />
                                    </svg>
                                </li>
                                <li>
                                    <h4 className="text-white text-sm font-medium">112m</h4>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-sm font-medium capitalize">{item.media_type}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}