import { languages } from "@/data/languages"
import { LanguageTransTypes } from "@/typescript/types";
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLanguage(iso_639_1: string, to: LanguageTransTypes): string {
  const language = languages.find((language) => language.iso_639_1 === iso_639_1);
  return language ? language[to] : iso_639_1;
}