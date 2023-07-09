import { NavLink } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import MovieSearchInput from "./ui/search";
import { navigationLinks } from "@/app/config/site";

export interface NavigationBarProps
    extends React.HTMLAttributes<HTMLDivElement> { }

export default function NavigationBar({ className }: NavigationBarProps) {
    return (
        <nav className={`${className}`}>
            <div className="container z-30 flex h-[72px] w-full items-center">
                <div className="flex h-full w-full items-center justify-between px-4 sm:px-8 xl:px-2">
                    <div className="flex items-center gap-x-16">
                        <Link href="/home">
                            <Image
                                className="object-contain"
                                src={"/logo.svg"}
                                alt="logo"
                                width={189}
                                height={40}
                            />
                        </Link>
                        <MovieSearchInput />
                    </div>
                    <div className="flex items-center gap-x-8">
                        <ul className="hidden items-center gap-x-6 md:flex">
                            {navigationLinks.map((link) => (
                                <NavigationLink
                                    key={link.title}
                                    title={link.title}
                                    href={link.href}
                                />
                            ))}
                        </ul>
                        {/* <Button
                            asChild
                            className="bg-white font-semibold  text-purple-700 hover:bg-gray-100"
                        >
                            <Link href="/home">Login</Link>
                        </Button> */}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export const NavigationLink = (link: NavLink) => {
    return (
        <li className="text-sm text-white">
            <Link href={link.href}>{link.title}</Link>
        </li>
    );
};
