import { MovieVideo } from "@/types";
import Image from "next/image";

export default function TrailerCard({ video }: { video: MovieVideo }) {
    return (
        <div
            className={`group relative h-36 w-full cursor-pointer overflow-hidden rounded-sm`}
        >
            <Image
                className="absolute object-cover"
                alt={video.name}
                src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLB2EoORWOGsz-YJAN_0sFx42DbuwA`}
                fill
            />

            <div className="absolute h-full w-full bg-black/60 duration-300 group-hover:bg-black/20 " />

            <div className="absolute flex h-full w-full items-center justify-center">
                <span className="text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-12 w-12 text-white/50 duration-300 hover:text-white/90"
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
                </span>
            </div>
        </div>
    );
}
