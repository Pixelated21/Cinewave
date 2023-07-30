import { NavLink } from "@/types";

export const navigationLinks: NavLink[] = [
    {
        title: "Share Space",
        href: "/share-space",
        is_auth: true,
        isDisabled: true,
    },
    {
        title: "Try Me",
        href: "/try-me",
        isDisabled: true,
    },
    {
        title: "Movies",
        href: "/movie",
        isDisabled: true,
    },
    {
        title: "Series",
        href: "/series",
        isDisabled: true,
    },
    {
        title: "Profile",
        href: "/profile",
        is_auth: true,
        isDisabled: true,
    },
];