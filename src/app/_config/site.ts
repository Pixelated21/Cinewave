import { NavLink } from "@/types";

export const navigationLinks: NavLink[] = [
	{
		title: "Share Space",
		href: "/share-space",
		is_auth: true,
		is_visible: true,
		isDisabled: true,
	},
	{
		title: "Try Me",
		href: "/try-me",
		isDisabled: true,
		is_visible: true,
	},
	{
		title: "Movies",
		href: "/movie",
		isDisabled: true,
		is_visible: true,
	},
	{
		title: "Series",
		href: "/series",
		isDisabled: true,
		is_visible: true,
	},
	{
		title: "Profile",
		href: "/profile",
		is_auth: true,
		isDisabled: false,
		is_visible: true,
	},
];
