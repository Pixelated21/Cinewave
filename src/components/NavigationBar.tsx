import { NavLink } from "@/typescript/interfaces";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import MovieSearchInput from "./ui/search";

export interface NavigationBarProps extends React.HTMLAttributes<HTMLDivElement> { }

export const links: NavLink[] = [
    {
        title: 'Movies',
        href: '/home',
    },
    {
        title: 'Try Me',
        href: '/try-me'
    },
    {
        title: 'Series',
        href: '/home',
    },
    // {
    //     title: 'Share Space',
    //     href: '/home',
    //     is_auth: true,
    // },
    {
        title: 'Profile',
        href: '/profile',
        is_auth: true
    }
]

export default function NavigationBar({ className, ...props }: NavigationBarProps) {
    return (
        <nav className={`${className}`}>
            <div className="max-w-7xl mx-auto h-[72px] z-30 flex items-center w-full">
                <div className="flex justify-between items-center h-full w-full px-4 sm:px-8 xl:px-2">
                    <div className="flex gap-x-16 items-center">
                        <Link href="/home">
                            <Image className="object-contain" src={'/logo.svg'} alt="logo" width={189} height={40} />
                        </Link>
                        <MovieSearchInput />
                    </div>
                    <div className="flex items-center gap-x-8">
                        <ul className="md:flex items-center gap-x-8 hidden">
                            {links.map((link) => (
                                <NavigationLink key={link.title} title={link.title} href={link.href} />
                            ))}
                        </ul>
                        <Button asChild className="bg-white hover:bg-gray-100  text-purple-700 font-semibold">
                            <Link href="/home">Login</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export const NavigationLink = (link: NavLink) => {
    return (
        <li className="text-sm text-white">
            <Link href={link.href}>{link.title}</Link>
        </li>
    )
}