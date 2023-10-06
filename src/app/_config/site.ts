import { NavLink } from "@/types";

export const navigationLinks: NavLink[] = [
	{
		title: "Share Space",
		href: "/share-space",
		is_visible: true,
		isDisabled: false,
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
		isDisabled: false,
		is_visible: true,
	},
	{
		title: "Series",
		href: "/series",
		isDisabled: false,
		is_visible: true,
	},
];
