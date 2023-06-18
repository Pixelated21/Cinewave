import { Cast } from "@/typescript/interfaces";
import Image from "next/image";
import Link from "next/link";

export default function CastCard({ cast }: { cast: Cast }) {
    return (
        <Link href={'#'} className="text-white w-[133px]">
            <div className="relative h-[200px] w-[133px]">
                <Image alt="" src={`https://image.tmdb.org/t/p/w185/${cast.profile_path}`} fill className=" object-cover cursor-pointer rounded-sm  duration-300 absolute" />
            </div>

            <div className="flex flex-col mt-2 w-[133px]">
                <p className="text-xs truncate">{cast.name}</p>
                <p className="text-sm font-semibold text-ellipsis truncate">{cast.character}</p>
            </div>
        </Link>
    )
}