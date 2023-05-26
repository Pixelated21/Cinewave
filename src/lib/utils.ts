import { languages } from "@/data/languages"
import { Language } from "@/typescript/interfaces";
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


type LanguageTransTypes = "iso_639_1" | "english_name" | "name";

export function getLanguage(iso_639_1: string, to: LanguageTransTypes): string {
  const language = languages.find((language) => language.iso_639_1 === iso_639_1);
  return language ? language[to] : iso_639_1;
}