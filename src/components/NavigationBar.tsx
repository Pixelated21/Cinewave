import { NavLink } from "@/types";
import Image from "next/image";
import Link from "next/link";
import MovieSearchInput from "./ui/search";
import { navigationLinks } from "@/app/_config/site";
import AuthButton from "./auth-button";
import { getServerSession } from "next-auth";
import { NavigationLinks } from "./navigation-links";

export interface NavigationBarProps
    extends React.HTMLAttributes<HTMLDivElement> { }

export default function NavigationBar({ className }: NavigationBarProps) {
    return (
        <nav className={`${className}`}>
            <div className="container z-30 flex md:h-[72px] h-[55px] w-full items-center">
                <div className="flex h-full w-full items-center justify-between px-0 sm:px-2 xl:px-2">
                    <div className="flex items-center gap-x-16">
                        <Link className="relative md:w-[189px] md:h-[40px] w-[120px] h-[60px]" href="/home">
                            <Image
                                className="object-contain absolute "
                                src={"/logo.svg"}
                                alt="logo"
                                fill
                            />
                        </Link>
                        <MovieSearchInput />
                    </div>
                    <div className="flex items-center gap-x-8">
                        {/* @ts-expect-error Async Server Component */}
                        <NavigationLinks />
                        <AuthButton />
                    </div>
                </div>
            </div>
        </nav>
    );
}

