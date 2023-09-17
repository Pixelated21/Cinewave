import { NavLink } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import MovieSearchInput from "./ui/search";
import { navigationLinks } from "@/app/_config/site";
import AuthButton from "./auth-button";
import { getServerSession } from "next-auth";

export interface NavigationBarProps
    extends React.HTMLAttributes<HTMLDivElement> { }

export default async function NavigationBar({ className }: NavigationBarProps) {
    const session = await getServerSession()
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
                        <ul className="hidden items-center gap-x-8 md:flex">
                            {navigationLinks.map((link) => {
                                if (link.is_auth && !session) return false
                                if (!link.is_visible) return false
                                return (
                                    <li
                                        key={link.title}
                                    >
                                        <NavigationLink
                                            linkData={link}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                        <AuthButton />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export const NavigationLink = ({ linkData }: { linkData: NavLink }) => {
    if (linkData.isDisabled) {
        return <span className="text-sm text-white/60 px-0 py-0 hover:no-underline cursor-not-allowed">{linkData.title}</span>
    }
    return <Link className="text-sm text-white hover:text-gray-300 duration-200" href={linkData.href}>{linkData.title}</Link>
};
