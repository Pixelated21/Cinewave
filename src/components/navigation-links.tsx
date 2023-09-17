import { navigationLinks } from "@/app/_config/site";
import { NavLink } from "@/types";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const NavigationLinks = async () => {
    const session = getServerSession()
    return (
        <ul className="hidden items-center gap-x-8 md:flex">
            {navigationLinks.map((link) => {
                if (link.is_auth && !session) return false
                if (!link.is_visible) return false
                if (link.isDisabled) return (
                    <span className="text-sm text-white/60 px-0 py-0 hover:no-underline cursor-not-allowed">{link.title}</span>
                )
                return (
                    <li
                        key={link.title}
                    >
                        <Link className="text-sm text-white hover:text-gray-300 duration-200" href={link.href}>{link.title}</Link>
                    </li>
                )
            })}
        </ul>
    )
};
