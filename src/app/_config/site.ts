import { NavLink } from "@/types";

export const navigationLinks: NavLink[] = [
    {
        title: "Share Space",
        href: "/share-space",
        is_auth: true,
        is_visible: false,
        isDisabled: true,
    },
    {
        title: "Try Me",
        href: "/try-me",
        isDisabled: true,
        is_visible: false,
    },
    {
        title: "Movies",
        href: "/movie",
        isDisabled: true,
        is_visible: false,
    },
    {
        title: "Series",
        href: "/series",
        isDisabled: true,
        is_visible: false,
    },
    {
        title: "Profile",
        href: "/profile",
        is_auth: true,
        isDisabled: true,
        is_visible: false,
    },
];