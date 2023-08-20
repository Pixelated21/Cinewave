import { Cast } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function CastCard({ cast }: { cast: Cast }) {
    return (
        <Link href={"#"} className="w-[133px] text-white">
            <div className="relative h-[200px] w-[133px]">
                <Image
                    alt=""
                    src={`${process.env.NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL}/w185/${cast.profile_path}`}
                    fill
                    className=" absolute cursor-pointer rounded-sm  object-cover duration-300"
                />
            </div>

            <div className="mt-2 flex w-[133px] flex-col">
                <p className="truncate text-xs">{cast.name}</p>
                <p className="truncate text-ellipsis text-sm font-semibold">
                    {cast.character}
                </p>
            </div>
        </Link>
    );
}
