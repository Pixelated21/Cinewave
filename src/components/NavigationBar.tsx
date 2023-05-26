import { NavLink } from "@/typescript/interfaces";
import Image from "next/image";
import Link from "next/link";

export interface NavigationBarProps extends React.HTMLAttributes<HTMLDivElement> { }

export const links: NavLink[] = [
    {
        title: 'Home',
        href: '/home',
    },
    {
        title: 'Movies',
        href: '/movies'
    },
    {
        title: 'Try Me',
        href: '/try-me'
    },
    {
        title: 'Series',
        href: '/series'
    },
    {
        title: 'Profile',
        href: '/profile',
        is_auth: false
    }
]

export default function NavigationBar({ className, ...props }: NavigationBarProps) {
    return (
        // TODO: Sync transition perfectly with the hero section
        <nav className={`${className}`}>
            <div className="max-w-7xl mx-auto h-[72px] flex items-center w-full">
                <div className="flex justify-between items-center h-full w-full">
                    <div className="flex gap-x-16 items-center">
                        <div>
                            <Image className="object-contain" src={'/logo.svg'} alt="logo" width={189} height={40} />
                        </div>
                        <div className="h-10 w-44 bg-white"></div>
                    </div>
                    <div className="flex items-center gap-x-8">
                        <ul className="flex items-center gap-x-8">
                            {links.map((link) => (
                                <NavigationLink key={link.title} title={link.title} href={link.href} />
                            ))}
                        </ul>
                        <div className="h-10 w-28 bg-white rounded-sm grid place-items-center">
                            <span className="text-sm font-bold text-black">Logout</span>
                        </div>
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