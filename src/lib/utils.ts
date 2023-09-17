import { languages } from "@/data/languages";
import { LanguageTransTypes } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getLanguage(iso_639_1: string, to: LanguageTransTypes): string {
	const language = languages.find(
		(language) => language.iso_639_1 === iso_639_1
	);
	return language ? language[to] : iso_639_1;
}

export function formatSearchQuery(input: string, encode = true) {
	let sanitizedInput = input.trim(); // Remove leading and trailing spaces

	// Remove unsafe characters
	sanitizedInput = sanitizedInput.replace(/[^\w\s-]/g, "");

	// Convert to lowercase
	sanitizedInput = sanitizedInput.toLowerCase();

	// Remove duplicated hyphens
	sanitizedInput = sanitizedInput.replace(/-{2,}/g, "-");

	if (encode) {
		// Replace spaces with hyphens
		sanitizedInput = sanitizedInput.replace(/\s+/g, "-");
	} else {
		// Replace hyphens with spaces
		sanitizedInput = sanitizedInput.replace(/-/g, " ");
	}

	return sanitizedInput;
}

export function isReleasedBeforeToday(dateString: string) {
	const currentDate = new Date();
	const releaseDate = new Date(dateString);

	// Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison
	currentDate.setHours(0, 0, 0, 0);
	releaseDate.setHours(0, 0, 0, 0);

	return releaseDate > currentDate;
}

export function getGenres(genreIds: number[] | string[], genres: any[]) {
	if (!genres) return genreIds;
	if (genreIds?.length < 0) return [];
	return genreIds.map((genreId) => {
		const genre = genres.find((genre) => genre.id === genreId);
		return genre ? genre.name : "";
	});
}

export function daysToSeconds(days: number) {
	return days * 24 * 60 * 60;
}

export function getYear(dateString: string) {
	const date = new Date(dateString);
	return date.getFullYear();
}

export function getInitials(name: string) {
	// Split the name into words
	const words = name.split(" ");

	// Initialize an empty string to store the initials
	let initials = "";

	// Iterate through the words and add the first character of each word to the initials
	for (const word of words) {
		if (word.length > 0) {
			initials += word[0].toUpperCase();
		}
	}

	return initials;
}
